import React, { useEffect, useState } from 'react'
import { msgService } from '../services/msgService'

export default function EditMsgs() {
    const [msgsTemplate, setMsgsTemplate] = useState({ check: '', invitation: '', start: '' })

    useEffect(() => {
        const template = msgService.getMsgTemplate()
        setMsgsTemplate(template)
    }, [])

    useEffect(() => {
        msgService.setMsgTemplate(msgsTemplate)
    }, [msgsTemplate])

    const onSetTemplate = ({ target }) => {
        const { name, value } = target
        setMsgsTemplate({
            ...msgsTemplate,
            [name]: value
        })
    }

    return (
        <section className="edit-msg flex column space-between align-center">
            <h1>Edit Messeges</h1>
            <label htmlFor="edit-check">check</label>
            <textarea name="check" id="edit-check" cols="20" rows="10" onChange={onSetTemplate} value={msgsTemplate.check}></textarea>
            <label htmlFor="edit-invitation">invitation</label>
            <textarea name="invitation" id="edit-invitation" cols="230" rows="10" onChange={onSetTemplate} value={msgsTemplate.invitation}></textarea>
            <label htmlFor="edit-start">start</label>
            <textarea name="start" id="edit-start" cols="20" rows="10" onChange={onSetTemplate} value={msgsTemplate.start}></textarea>
        </section>
    )
}
