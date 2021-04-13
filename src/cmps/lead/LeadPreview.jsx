import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export function LeadPreview({ lead, onSendMsg, onDeleteLead, onAddInfo, idx }) {


    return (
        <Draggable draggableId={lead.id} index={idx}>
            {provided => (
                <li className={`lead-preview flex space-between align-center ${lead.status}`}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                    <h1 className="flex">{lead.name} - {lead.num}</h1>
                    <p suppressContentEditableWarning={true} contentEditable onInput={(ev) => onAddInfo(ev, lead.id)}>{lead.info}</p>
                    <section className="lead-actions flex space-between">
                        {/* <div className="lead-action-wrapper"> */}
                            <button onClick={() => onSendMsg(lead, 'first-step')}>check</button>
                            <button onClick={() => onSendMsg(lead, 'second-step')}>invitation</button>
                        {/* </div> */}
                        {/* <div className="lead-action-wrapper"> */}
                            <button onClick={() => onSendMsg(lead, 'third-step')}>start</button>
                            <button onClick={() => onDeleteLead(lead.id)}>X</button>
                        {/* </div> */}
                    </section>
                </li>
            )}
        </Draggable>
    )
}
