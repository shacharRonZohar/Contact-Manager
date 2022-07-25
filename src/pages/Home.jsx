import React, { useCallback, useEffect, useState } from 'react'
import AsideBar from '../cmps/AsideBar'
import { LeadFilter } from '../cmps/lead/LeadFilter'
import { LeadList } from '../cmps/lead/LeadList'
import LeadSavedLists from '../cmps/lead/LeadSavedList'
import { leadService } from '../services/leadService'

export function Home() {
  const [leads, setLeads] = useState([])
  const [lead, setLead] = useState({
    fName: '',
    lName: '',
    num: '',
    status: '',
    info: '',
  })
  const [zoomUrl, setZoomUrl] = useState('')
  const [filter, setFilter] = useState({ status: '' })
  const [listToSave, setSavedList] = useState({ title: '' })
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

  const onAddLead = async (ev) => {
    ev.preventDefault()
    leadService.saveLead(lead)
    setLead({ fName: '', lName: '', num: '' })
  }

  const onInputChange = ({ target: { value, name } }) => {
    if (name === 'list-title') setSavedList({ title: value })
    setLead({
      ...lead,
      [name]: value,
    })
    console.log(lead)
  }

  const onSendMsg = (currLead, status) => {
    leadService.sendMsg(currLead, status, zoomUrl)
    loadLeads()
  }

  const onDeleteLead = (leadId) => {
    leadService.remove(leadId)
    loadLeads()
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
    const { destination, source, draggableId } = res
    if (!destination) return
    const newIdx = destination.index
    const prevIdx = source.index
    leadService.updateLeadIdx(newIdx, prevIdx)
    loadLeads()
  }, [leads, filter])

  const setCurrList = (currLeads) => {
    leadService.setLeadsList(currLeads)
    loadLeads()
  }

  return (
    <main className="homepage">
      <AsideBar
        lead={lead}
        listToSave={listToSave}
        onAddLead={onAddLead}
        onInputChange={onInputChange}
        onSetZoomUrl={onSetZoomUrl}
        onSaveList={onSaveList}
        onSendAll={onSendAll}
      />
      <section className="main-list">
        <div className="main-list-header">
          <h2>on the list now: {leads.length}</h2>
          <LeadFilter onSetFilter={onSetFilter} />
        </div>
        <LeadList
          leads={leads}
          onDragEnd={onDragEnd}
          onSendMsg={onSendMsg}
          onDeleteLead={onDeleteLead}
          onAddInfo={onAddInfo}
        />
      </section>
      <LeadSavedLists savedLists={savedLists} setCurrList={setCurrList} />
    </main>
  )
}
