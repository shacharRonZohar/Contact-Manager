import React, { useCallback, useEffect, useState } from 'react'
import { LeadFilter } from '../cmps/lead/LeadFilter'
import { LeadList } from '../cmps/lead/LeadList'
import { leadService } from '../services/leadService'
import { storageService } from '../services/storageService'

export function Home() {

    const [leads, setLeads] = useState([])
    const [lead, setLead] = useState({ name: '', num: '', status: '', info: '' })
    const [zoomUrl, setZoomUrl] = useState('')
    const [filter, setFilter] = useState({ status: '' })

    useEffect(() => {
        loadLeads()
    }, [lead, filter])

    const loadLeads = () => {
        console.log("filter:", filter);
        const leads = leadService.getLeads(filter)
        setLeads([...leads])
    }

    const onAddLead = (ev) => {
        ev.preventDefault();
        console.log(lead);
        leadService.addLead(lead)
        setLead({ name: '', num: '' })
    }

    const onInputChange = (ev) => {
        setLead({
            ...lead, [ev.target.name]: ev.target.value
        })
    }

    const onSendMsg = (currLead, status) => {
        leadService.sendMsg(currLead, status, zoomUrl)
        loadLeads()
    }

    const onDeleteLead = (leadId) => {
        leadService.remove(leadId)
        loadLeads()
    }

    function onClearStorage() {
        storageService.saveToStorage('myLeads', null)
        window.location.reload();
    }

    const onSetZoomUrl = (ev) => {
        setZoomUrl(ev.target.value)
    }

    const onAddInfo = (ev, leadId) => {
        const txt = ev.target.textContent
        console.log(ev.target.textContent, leadId);
        leadService.addInfo(txt, leadId)
    }

    const onSetFilter = (filter) => {
        console.log("🚀 ~ file: Home.jsx ~ line 63 ~ onSetFilter ~ filter", filter)
        setFilter(filter)
    }

    const onDragEnd = useCallback((res) => {
        // the only one that is required
        const { destination, source, draggableId } = res;
        if (!destination) return
        const newIdx = destination.index
        const prevIdx = source.index
        leadService.updateLeadIdx(newIdx, prevIdx)
        console.log(res);
        loadLeads()
    }, []);


    return (
        <main className="homepage">
            <section className="main-section flex column space-between align-center">
                <h1>Leads-Manager</h1>
                <h2>on the list now: {leads.length}</h2>
                <form className="main-form" onSubmit={(ev) => onAddLead(ev)}>
                    <input type="text" onChange={onInputChange} name="num" value={lead.num} placeholder="num" />
                    <input type="text" onChange={onInputChange} name="name" value={lead.name} placeholder="name" />
                    <button>add</button>
                </form>
                <div className="zoom-clear-wrapper">
                    <input type="text" placeholder="ZOOM url" onChange={onSetZoomUrl} />
                    <button className="clear-btn" onClick={() => onClearStorage()}>clear storage</button>
                </div>
                <LeadFilter onSetFilter={onSetFilter} />
            </section>
            {/* <section className="main-container"> */}
            <LeadList leads={leads} onDragEnd={onDragEnd} onSendMsg={onSendMsg} onDeleteLead={onDeleteLead} onAddInfo={onAddInfo} />
            {/* </section> */}
        </main>
    )
}
