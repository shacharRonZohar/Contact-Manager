import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts, onSendMsg, onDeleteContact, onAddInfo, onDragEnd }) {
    console.log("🚀 ~ file: ContactList.jsx ~ line 4 ~ ContactList ~ contacts", contacts)
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'contactList'}>
                {(provided) => (
                    <ul className="contact-list clean-list flex column"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>

                        {
                            contacts.map((contact, idx) => <ContactPreview key={contact.id}
                                idx={idx}
                                onAddInfo={onAddInfo}
                                contact={contact}
                                onSendMsg={onSendMsg}
                                onDeleteContact={onDeleteContact}
                            ></ContactPreview>)
                        }
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}
