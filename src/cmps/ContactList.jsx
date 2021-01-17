import React from 'react'
import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts, onSendMsg, onDeleteContact }) {
    console.log("🚀 ~ file: ContactList.jsx ~ line 4 ~ ContactList ~ contacts", contacts)
    return (
        <ul className="contact-list clean-list">

            {
                contacts.map(contact => <ContactPreview key={contact.id}
                    contact={contact}
                    onSendMsg={onSendMsg}
                    onDeleteContact={onDeleteContact}
                ></ContactPreview>)
            }

        </ul>
    )
}
