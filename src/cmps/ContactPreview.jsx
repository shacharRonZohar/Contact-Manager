import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

export function ContactPreview({ contact, onSendMsg, onDeleteContact, onAddInfo, idx }) {


    return (
        <Draggable draggableId={contact.id} index={idx}>
            {provided => (
                <li className={`contact-preview flex space-between align-center ${contact.status}`}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                    <h1 className="flex">{contact.name} - {contact.num}</h1>
                    <p suppressContentEditableWarning={true} contentEditable onInput={(ev) => onAddInfo(ev, contact.id)}>{contact.info}</p>
                    <section className="contact-actions flex">
                        <div className="contact-action-wrapper">
                            <button onClick={() => onSendMsg(contact, 'first-step')}>check</button>
                            <button onClick={() => onSendMsg(contact, 'second-step')}>invitation</button>
                        </div>
                        <div className="contact-action-wrapper">
                            <button onClick={() => onSendMsg(contact, 'third-step')}>start</button>
                            <button onClick={() => onDeleteContact(contact.id)}>X</button>
                        </div>
                    </section>
                </li>
            )}
        </Draggable>
    )
}
