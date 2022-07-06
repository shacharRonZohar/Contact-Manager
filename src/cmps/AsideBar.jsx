import React, { useState } from 'react'
import { storageService } from '../services/storageService'

export default function AsideBar({ lead, listToSave, onAddLead, onInputChange, onSetZoomUrl, onSaveList, onSendAll }) {

  const [isMobileScreen, setIsMobileScreen] = useState(false)

  function onClearStorage() {
    storageService.saveToStorage('myLeads', null)
    window.location.reload()
  }

  return (
    <section className={`aside-bar flex column space-around align-center ${isMobileScreen ? 'screen-open' : ''}`}>
      <button className="clear-btn" onClick={() => onClearStorage()}>clear storage</button>
      <form className="main-form flex column align-center" onSubmit={(ev) => onAddLead(ev)}>
        <h3>Add Lead</h3>
        <input type="text" onChange={onInputChange} name="num" value={lead.num} placeholder="Phone number" />
        <input type="text" onChange={onInputChange} name="fName" value={lead.fName} placeholder="First Name" />
        <input type="text" onChange={onInputChange} name="lName" value={lead.lName} placeholder="Last Name" />
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
      <button className='mobile-options-btn' onClick={() => setIsMobileScreen(!isMobileScreen)}>⚙️</button>
    </section>
  )
}
