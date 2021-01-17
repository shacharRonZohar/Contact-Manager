import React from 'react'

export function ContactPreview({contact, onSendMsg, onDeleteContact}) {
    console.log(contact);
    return (
        <li className={`contact-preview ${contact.status}`}>
            <h1>{contact.name} - {contact.num}</h1>
            <button onClick={() => onSendMsg(contact, 'first-step')}>send check msg</button>
            <button onClick={() => onSendMsg(contact, 'second-step')}>send invitation msg</button>
            <button onClick={() => onSendMsg(contact, 'third-step')}>send start msg</button>
            <button onClick={() => onDeleteContact(contact.id)}>X</button>
        </li>
    )
}
