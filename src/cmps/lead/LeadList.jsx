import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { LeadPreview } from './LeadPreview'

export function LeadList({ leads, onSendMsg, onDeleteLead, onAddInfo, onDragEnd }) {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'leadList'}>
                {(provided) => (
                    <ul className="lead-list clean-list flex column"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>

                        {
                            leads.map((lead, idx) => <LeadPreview key={lead.id}
                                idx={idx}
                                onAddInfo={onAddInfo}
                                lead={lead}
                                onSendMsg={onSendMsg}
                                onDeleteLead={onDeleteLead}
                            ></LeadPreview>)
                        }
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}
