import React, { useEffect, useState } from 'react'
import { ContactList } from '../cmps/ContactList'
import { contactService } from '../services/contactService'
import { storageService } from '../services/storageService'

export function Home() {

    const [contacts, setContacts] = useState([])
    const [contact, setContact] = useState({ name: '', num: '' })
    const [zoomUrl, setZoomUrl] = useState('')

    useEffect(() => {
        loadContacts()
        console.log(contact)
    }, [contact])

    const loadContacts = () => {
        const contacts = contactService.getContacts()
        setContacts([...contacts])
    }

    const onSendMsg = (ev) => {
        ev.preventDefault();
        console.log(contact);
        contactService.sendMsg(contact)
        setContact({ name: '', num: '' })
    }

    const onInputChange = (ev) => {
        setContact({
            ...contact, [ev.target.name]: ev.target.value
        })
    }

    const onSendCheckMsg = (currContact) => {
        contactService.sendCheckMsg(currContact)
    }

    const onSendInvitation = (contactNum) => {
        contactService.sendInvitation(zoomUrl, contactNum)
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


    return (
        <section className="homepage">
            <h1>Contacts-Manager</h1>
            <form onSubmit={(ev) => onSendMsg(ev)}>
                <input type="text" onChange={onInputChange} name="num" value={contact.num} placeholder="num" />
                <input type="text" onChange={onInputChange} name="name" value={contact.name} placeholder="name" />
                <button>send</button>
            </form>
            <input type="text" placeholder="ZOOM url" onChange={onSetZoomUrl}/>
            <button className="clear-btn" onClick={() => onClearStorage()}>clear storage</button>
            <ContactList contacts={contacts} onSendCheckMsg={onSendCheckMsg} onDeleteContact={onDeleteContact} onSendInvitation={onSendInvitation} />
        </section>
    )
}
