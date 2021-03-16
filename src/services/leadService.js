import { msgService } from "./msgService";
import { storageService } from "./storageService";
import { utilService } from "./utilService";

const LEAD_KEY = 'myLeads'

export const leadService = {
    addLead,
    getLeads,
    sendMsg,
    setLeadStatus,
    remove,
    addInfo,
    updateLeadIdx
}

var gLeads = storageService.loadFromStorage(LEAD_KEY) || []

function getLeads(filter = {}) {
    if (!filter.status) return gLeads;
    const leads = gLeads.filter(lead => lead.status === filter.status)
    return leads
}

function addLead(lead) {
    console.log("🚀 ~ file: leadService.js ~ line 6 ~ sendMsg ~ num", lead.num)
    if (!lead.num || lead.num.length < 10) {
        console.log('invalid num');
        return
    };
    _saveLead(lead)
}

function sendMsg(lead, status, url) {
    let valiNum = _getValidNum(lead.num)
    let res;
    switch (status) {
        case 'first-step': {
            const msg = msgService.createMsg('check', lead.name)
            res = encodeURI(msg);
            break;
        }
        case 'second-step': {
            const msg = msgService.createMsg('invitation', url)
            res = encodeURI(msg);
            break;
        }
        case 'third-step':{
            const msg = msgService.createMsg('start')
            res = encodeURI(msg);
            break;
        }
        default:
            break;
    }
    setLeadStatus(lead.id, status)
    window.open(`https://wa.me/972${valiNum}/?text=${res}`)
}


function setLeadStatus(leadId, newStatus) {
    const idx = _getIdxById(leadId)
    gLeads[idx].status = newStatus
    _saveToStorage()
}

function addInfo(txt, leadId) {
    const idx = _getIdxById(leadId)
    gLeads[idx].info = txt
    _saveToStorage()
}

function remove(leadId) {
    const idx = gLeads.findIndex(lead => lead.id === leadId)
    const removedLead = gLeads.splice(idx, 1)
    _saveToStorage()
    return removedLead
}

function updateLeadIdx(newIdx, PrevIdx) {
    const leadArr = gLeads.splice(PrevIdx, 1)
    gLeads.splice(newIdx, 0, leadArr[0])
    _saveToStorage()
}


// Local Functions

function _getValidNum(num) {
    return num.split('').filter((char) => char !== '-').join('')
}

function _getIdxById(id) {
    return gLeads.findIndex(lead => lead.id === id)
}

function _saveLead(lead) {
    lead.id = utilService.makeId()
    gLeads.push(lead)
    _saveToStorage()
}

function _saveToStorage() {
    storageService.saveToStorage(LEAD_KEY, gLeads)
}



// DEPRECATED


// function sendCheckMsg(lead) {
//     let valiNum = _getValidNum(lead.num)
//     let res = encodeURI(`אהלן ${lead.name}! זה מתן מקודינג אקדמי:) היום ערב ההכרות שלנו! את/ה מגיע/ה?`); 
//     window.open(`https://wa.me/972${valiNum}/?text=${res}`)
// }

// function sendInvitation(url , num) {
//     let valiNum = _getValidNum(num)
//     let res = encodeURI(`זה הלינק לערב ההכרות שמתחיל בשעה 18:00:\n\n ${url} \n\n כדאי להכנס קצת לפני כדי לראות שאין בעיות טכניות. \n\n מחכה לראותך!:)`); 
//     window.open(`https://wa.me/972${valiNum}/?text=${res}`)
// }

// function sendStartMsg(num) {
//     let valiNum = _getValidNum(num)
//     let res = encodeURI(`מתחילים עוד כמה דקות! כדאי להכנס ולראות אם הכל עובד כמו שצריך:)`); 
//     window.open(`https://wa.me/972${valiNum}/?text=${res}`)
// }