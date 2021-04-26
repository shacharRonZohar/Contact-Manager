import React, { useCallback, useEffect, useState } from 'react'
import { LeadFilter } from '../cmps/lead/LeadFilter'
import { LeadList } from '../cmps/lead/LeadList'
import LeadSavedLists from '../cmps/lead/LeadSavedList'
import { leadService } from '../services/leadService'
import { storageService } from '../services/storageService'

export function Home() {
    const [leads, setLeads] = useState([])
    const [lead, setLead] = useState({ name: '', num: '', status: '', info: '' })
    const [zoomUrl, setZoomUrl] = useState('')
    const [filter, setFilter] = useState({ status: '' })
    const [listToSave, setSavedList] = useState({ title: ''})
    const [savedLists, setSavedLists] = useState([])

    useEffect(() => {
        loadLeads()
    }, [lead, filter])

    useEffect(() => {
        loadLists()
    }, [listToSave])

    const loadLeads = () => {
        const leads = leadService.getLeads(filter)
        setLeads([...leads])
    }

    const loadLists = () => {
        const savedLists = leadService.getSavedLists()
        setSavedLists([...savedLists])
    }

    const onAddLead = (ev) => {
        ev.preventDefault();
        leadService.addLead(lead)
        setLead({ name: '', num: '' })
    }

    const onInputChange = ({ target }) => {
        const { value, name } = target
        if (name === 'list-title') setSavedList({ title: value })
        setLead({
            ...lead, [name]: value
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
        leadService.addInfo(txt, leadId)
    }

    const onSaveList = (ev) => {
        ev.preventDefault()
        leadService.saveList(leads, listToSave.title)
        setSavedList({ title: '' })
    }

    const onSetFilter = (filter) => {
        setFilter(filter)
    }

    const onSendAll = () => {
        leadService.sendAll(leads, filter.status, zoomUrl)
        loadLeads()
    }

    const onDragEnd = useCallback((res) => {
        // the only one that is required
        const { destination, source, draggableId } = res;
        if (!destination) return
        console.log("🚀 ~ file: Home.jsx ~ line 91 ~ onDragEnd ~ destination", destination)
        const newIdx = destination.index
        const prevIdx = source.index
        leadService.updateLeadIdx(newIdx, prevIdx)
        loadLeads()
    }, [leads, filter]);

    const setCurrList = (currLeads) => {
        leadService.setLeadsList(currLeads)
        loadLeads()
    }
    

    return (
        <main className="homepage">
            <section className="main-section flex column space-around align-center">
                <button className="clear-btn" onClick={() => onClearStorage()}>clear storage</button>
                <form className="main-form flex column align-center" onSubmit={(ev) => onAddLead(ev)}>
                    <h3>Add Lead</h3>
                    <input type="text" onChange={onInputChange} name="num" value={lead.num} placeholder="num" />
                    <input type="text" onChange={onInputChange} name="name" value={lead.name} placeholder="name" />
                    <button>add</button>
                </form>
                <div className="zoom-wrapper">
                    <h3>Insert Url</h3>
                    <input type="text" placeholder="ZOOM url" onChange={onSetZoomUrl} />
                </div>
                <form className="save-list-form flex column align-center" onSubmit={onSaveList}>
                    <h3>Save List</h3>
                    <input type="text" name="list-title" placeholder="insert title" onChange={onInputChange} value={listToSave.title} required />
                    <button className="save-list-btn">save this list</button>
                </form>
                <button onClick={onSendAll}>send all</button>
            </section>
            <section className="main-list">
                <div className="main-list-header">
                    <h2>on the list now: {leads.length}</h2>
                    <LeadFilter onSetFilter={onSetFilter} />
                </div>
                <LeadList leads={leads} onDragEnd={onDragEnd} onSendMsg={onSendMsg} onDeleteLead={onDeleteLead} onAddInfo={onAddInfo} />
            </section>
            <LeadSavedLists savedLists={savedLists} setCurrList={setCurrList} />
        </main>
    )
}
