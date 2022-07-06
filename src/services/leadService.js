import { msgService } from "./msgService"
import { storageService } from "./storageService"
import { utilService } from "./utilService"

const LEAD_KEY = 'myLeads'

export const leadService = {
  addLead,
  getLeads,
  getSavedLists,
  sendMsg,
  setLeadStatus,
  remove,
  addInfo,
  updateLeadIdx,
  saveList,
  sendAll,
  setLeadsList
}

var gLeads = storageService.loadFromStorage(LEAD_KEY) || []
var gLeadLists = storageService.loadFromStorage('leadLists') || []

function getLeads(filter = {}) {
  if (!filter.status) return [...gLeads]
  const leads = gLeads.filter(lead => lead.status === filter.status)
  return leads
}

function getSavedLists() {
  return gLeadLists
}

function addLead(lead) {
  if (!lead.num || lead.num.length < 10) {
    console.log('invalid num')
    return
  };
  _saveLead(lead)
}

function sendMsg(lead, status, url) {
  let validNum = _getValidNum(lead.num)
  let res
  switch (status) {
    case 'first-step': {
      const msg = msgService.createMsg('check', lead.fName)
      res = encodeURI(msg)
      break
    }
    case 'second-step': {
      const msg = msgService.createMsg('invitation', url)
      res = encodeURI(msg)
      break
    }
    case 'third-step': {
      const msg = msgService.createMsg('start')
      res = encodeURI(msg)
      break
    }
    default:
      break
  }
  setLeadStatus(lead.id, status)
  window.open(`https://wa.me/972${validNum}/?text=${res}`)
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

function saveList(leads, title) {
  const newList = {
    id: utilService.makeId(4),
    title,
    leads
  }
  const leadLists = storageService.loadFromStorage('leadLists') || []
  leadLists.push(newList)
  storageService.saveToStorage('leadLists', leadLists)
  gLeadLists = leadLists
}

function sendAll(leads, currStatus, url) {
  if (currStatus === 'first-step') currStatus = 'second-step'
  else if (currStatus === 'second-step') currStatus = 'third-step'
  else if (!currStatus) currStatus = 'first-step'

  leads.forEach((lead) => {
    sendMsg(lead, currStatus, url)
  })
}

function setLeadsList(leads) {
  gLeads = [...leads]
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
//     let validNum = _getValidNum(lead.num)
//     let res = encodeURI(`אהלן ${lead.name}! זה מתן מקודינג אקדמי:) היום ערב ההכרות שלנו! את/ה מגיע/ה?`);
//     window.open(`https://wa.me/972${validNum}/?text=${res}`)
// }

// function sendInvitation(url , num) {
//     let validNum = _getValidNum(num)
//     let res = encodeURI(`זה הלינק לערב ההכרות שמתחיל בשעה 18:00:\n\n ${url} \n\n כדאי להכנס קצת לפני כדי לראות שאין בעיות טכניות. \n\n מחכה לראותך!:)`);
//     window.open(`https://wa.me/972${validNum}/?text=${res}`)
// }

// function sendStartMsg(num) {
//     let validNum = _getValidNum(num)
//     let res = encodeURI(`מתחילים עוד כמה דקות! כדאי להכנס ולראות אם הכל עובד כמו שצריך:)`);
//     window.open(`https://wa.me/972${validNum}/?text=${res}`)
// }