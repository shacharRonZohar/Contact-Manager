import { storageService } from "./storageService";
import { utilService } from "./utilService";

const CONTACT_KEY= 'myContacts'

export const contactService = {
    addContact,
    getContacts,
    sendMsg,
    setContactStatus,
    remove
}

var gContacts = storageService.loadFromStorage(CONTACT_KEY) || []

function getContacts(filter = {}) {
    if (!filter.status) return gContacts;
    const contacts = gContacts.filter(contact => contact.status === filter.status)
    return contacts
}

function addContact(contact) {
    console.log("🚀 ~ file: contactService.js ~ line 6 ~ sendMsg ~ num", contact.num)
    if (!contact.num || contact.num.length < 10) {
        console.log('invalid num');
        return
    };
    _saveContact(contact)
}

function sendMsg(contact, status, url) {
    let valiNum = _getValidNum(contact.num)
    let res;
    switch (status) {
        case 'first-step':
            res = encodeURI(`אהלן ${contact.name}! זה מתן מקודינג אקדמי:) היום ערב ההכרות שלנו! אני אראה אותך שם?`); 
            break;
        case 'second-step':
            res = encodeURI(`זה הלינק לערב ההכרות שמתחיל בשעה 18:00:\n\n ${url} \n\n כדאי להכנס קצת לפני כדי לראות שאין בעיות טכניות. \n\n מחכה לראותך!:)`); 
            break;
        case 'third-step':
            res = encodeURI(`מתחילים עוד כמה דקות! כדאי להכנס ולראות אם הכל עובד כמו שצריך:)`);    
            break;
        default:
            break;
    }
    setContactStatus(contact.id, status)
    window.open(`https://wa.me/972${valiNum}/?text=${res}`)
}


function setContactStatus(contactId, newStatus) {
    const idx = _getIdxById(contactId) 
    gContacts[idx].status = newStatus
    _saveToStorage()
}

function remove(contactId) {
    const idx = gContacts.findIndex(contact => contact.id === contactId)
    const removedContact = gContacts.splice(idx, 1)
    _saveToStorage()
    return removedContact
}


// Local Functions

function _getValidNum(num) {
    return num.split('').filter((char) => char !== '-').join('')
}

function _getIdxById(id) {
    return gContacts.findIndex(contact => contact.id === id)
}

function _saveContact(contact) {
    contact.id = utilService.makeId()
    gContacts.push(contact)
    _saveToStorage()
}

function _saveToStorage() {
    storageService.saveToStorage(CONTACT_KEY, gContacts)
}



// DEPRECAED


// function sendCheckMsg(contact) {
//     let valiNum = _getValidNum(contact.num)
//     let res = encodeURI(`אהלן ${contact.name}! זה מתן מקודינג אקדמי:) היום ערב ההכרות שלנו! את/ה מגיע/ה?`); 
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