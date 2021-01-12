import { storageService } from "./storageService";
import { utilService } from "./utilService";

const CONTACT_KEY= 'myContacts'

export const contactService = {
    sendMsg,
    getContacts,
    sendCheckMsg,
    sendInvitation,
    sendStartMsg,
    remove
}

var gContacts = storageService.loadFromStorage(CONTACT_KEY) || []

function getContacts() {
    return gContacts
}

function sendMsg(contact) {
    console.log("🚀 ~ file: contactService.js ~ line 6 ~ sendMsg ~ num", contact.num)
    if (!contact.num || contact.num.length < 10) {
        console.log('invalid num');
        return
    };
    var valiNum = _getValidNum(contact.num)
    var result = "https://api.whatsapp.com/send?phone=972" + valiNum;
    _saveContact(contact)
    window.open(result, "_blank");
}

function sendCheckMsg(contact) {
    let valiNum = _getValidNum(contact.num)
    let res = encodeURI(`אהלן ${contact.name}! זה מתן מקודינג אקדמי:) היום ערב ההכרות שלנו! את/ה מגיע/ה?`); 
    window.open(`https://wa.me/972${valiNum}/?text=${res}`)
}

function sendInvitation(url , num) {
    let valiNum = _getValidNum(num)
    let res = encodeURI(`זה הלינק לערב ההכרות שמתחיל בשעה 18:00:\n\n ${url} \n\n כדאי להכנס קצת לפני כדי לראות שאין בעיות טכניות. \n\n מחכה לראותך!:)`); 
    window.open(`https://wa.me/972${valiNum}/?text=${res}`)
}

function sendStartMsg(num) {
    let valiNum = _getValidNum(num)
    let res = encodeURI(`מתחילים עוד כמה דקות! כדאי להכנס ולראות אם הכל עובד כמו שצריך:)`); 
    window.open(`https://wa.me/972${valiNum}/?text=${res}`)
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


function _saveContact(contact) {
    contact.id = utilService.makeId()
    gContacts.push(contact)
    _saveToStorage()
}

function _saveToStorage() {
    storageService.saveToStorage(CONTACT_KEY, gContacts)
}
