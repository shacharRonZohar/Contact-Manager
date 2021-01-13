import React, { useEffect, useState } from 'react'
import { ContactList } from '../cmps/ContactList'
import { contactService } from '../services/contactService'
import { storageService } from '../services/storageService'

export function Home() {

    const [contacts, setContacts] = useState([])
    const [contact, setContact] = useState({ name: '', num: '', status: '' })
    const [zoomUrl, setZoomUrl] = useState('')

    useEffect(() => {
        loadContacts()
        console.log(contact)
    }, [contact])

    const loadContacts = () => {
        const contacts = contactService.getContacts()
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

    // const onSendCheckMsg = (currContact) => {
    //     contactService.sendCheckMsg(currContact)
    //     contactService.setContactStatus(currContact.id, 'first-step')
    //     loadContacts()
    // }

    // const onSendInvitation = (currContact) => {
    //     contactService.sendInvitation(zoomUrl, currContact.num)
    //     contactService.setContactStatus(currContact.id, 'second-step')
    //     loadContacts()
    // }

    // const onSendStartMsg = (currContact) => {
    //     contactService.sendStartMsg(currContact.num)
    //     contactService.setContactStatus(currContact.id, 'third-step')
    //     loadContacts()
    // }

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
            <form onSubmit={(ev) => onAddContact(ev)}>
                <input type="text" onChange={onInputChange} name="num" value={contact.num} placeholder="num" />
                <input type="text" onChange={onInputChange} name="name" value={contact.name} placeholder="name" />
                <button>send</button>
            </form>
            <input type="text" placeholder="ZOOM url" onChange={onSetZoomUrl} />
            <button className="clear-btn" onClick={() => onClearStorage()}>clear storage</button>
            <ContactList contacts={contacts}
                onSendMsg={onSendMsg}
                // onSendCheckMsg={onSendCheckMsg}
                onDeleteContact={onDeleteContact}
                // onSendInvitation={onSendInvitation}
                // onSendStartMsg={onSendStartMsg}
            />
        </section>
    )
}
