import React, { useCallback, useEffect, useState } from 'react'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactList } from '../cmps/ContactList'
import { contactService } from '../services/contactService'
import { storageService } from '../services/storageService'

export function Home() {

    const [contacts, setContacts] = useState([])
    const [contact, setContact] = useState({ name: '', num: '', status: '', info: '' })
    const [zoomUrl, setZoomUrl] = useState('')
    const [filter, setFilter] = useState({ status: '' })

    useEffect(() => {
        loadContacts()
    }, [contact, filter])

    const loadContacts = () => {
        console.log("filter:", filter);
        const contacts = contactService.getContacts(filter)
        setContacts([...contacts])
    }

    const onAddContact = (ev) => {
        ev.preventDefault();
        console.log(contact);
        contactService.addContact(contact)
        setContact({ name: '', num: '' })
    }

    const onInputChange = (ev) => {
        setContact({
            ...contact, [ev.target.name]: ev.target.value
        })
    }

    const onSendMsg = (currContact, status) => {
        contactService.sendMsg(currContact, status, zoomUrl)
        loadContacts()
    }

    const onDeleteContact = (contactId) => {
        contactService.remove(contactId)
        loadContacts()
    }

    function onClearStorage() {
        storageService.clearStorage()
        window.location.reload();
    }

    const onSetZoomUrl = (ev) => {
        setZoomUrl(ev.target.value)
    }

    const onAddInfo = (ev, contactId) => {
        const txt = ev.target.textContent
        console.log(ev.target.textContent, contactId);
        contactService.addInfo(txt, contactId)
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
        contactService.updateContactIdx(newIdx, prevIdx)
        console.log(res);
        loadContacts()
    }, []);


    return (
        <main className="homepage">
            <section className="main-section flex column space-between align-center">
                <h1>Contacts-Manager</h1>
                <h2>on the list now: {contacts.length}</h2>
                <form className="main-form" onSubmit={(ev) => onAddContact(ev)}>
                    <input type="text" onChange={onInputChange} name="num" value={contact.num} placeholder="num" />
                    <input type="text" onChange={onInputChange} name="name" value={contact.name} placeholder="name" />
                    <button>add</button>
                </form>
                <div className="zoom-clear-wrapper">
                    <input type="text" placeholder="ZOOM url" onChange={onSetZoomUrl} />
                    <button className="clear-btn" onClick={() => onClearStorage()}>clear storage</button>
                </div>
                <ContactFilter onSetFilter={onSetFilter} />
            </section>
            {/* <section className="main-container"> */}
            <ContactList contacts={contacts} onDragEnd={onDragEnd} onSendMsg={onSendMsg} onDeleteContact={onDeleteContact} onAddInfo={onAddInfo} />
            {/* </section> */}
        </main>
    )
}
