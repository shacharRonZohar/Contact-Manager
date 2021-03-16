import { storageService } from "./storageService";

const MSG_KEY = 'myMsgs'

export const msgService = {
    getMsgTemplate,
    setMsgTemplate,
    createMsg
}

let gTemplate = storageService.loadFromStorage(MSG_KEY) || {
    check:  `אהלן {{data}}! זה מתן מקודינג אקדמי:) היום ערב ההכרות שלנו! אני אראה אותך שם?`,
    invitation: `זה הלינק לערב ההכרות שמתחיל בשעה 18:00:\n\n {{data}} \n\n כדאי להכנס קצת לפני כדי לראות שאין בעיות טכניות. \n\n מחכה לראותך!:)`,
    start: `מתחילים עוד כמה דקות! כדאי להכנס ולראות אם הכל עובד כמו שצריך:)`
}

function getMsgTemplate() {
    return gTemplate;
}

function createMsg(type, data) {
    return gTemplate[type].replace('{{data}}', data)
}

function setMsgTemplate(template) {
    console.log("🚀 ~ file: msgService.js ~ line 23 ~ setMsgTemplate ~ template", template)
    gTemplate = template
    _saveToStorage()
}


// LOCAL FUNCTIONS
function _saveToStorage() {
    storageService.saveToStorage(MSG_KEY, gTemplate)
}
