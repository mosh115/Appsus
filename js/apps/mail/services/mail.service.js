import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    removeMail,
    createMail,
    getMailById,
    updateMail,
}

const KEY = 'mailDB';
const gLoggedinUser = {
    email: 'harvona.50forearm@appsus.com',
    fullname: 'Harvona Shushan'
}

_createMails();

function query(criteria) {
    const mails = _loadMailsFromStorage()
    const filteredMails = _getFilteredMalis(mails, criteria)
    return Promise.resolve(filteredMails)
}

function _getFilteredMalis(mails, criteria) {
    // console.log('from filter',criteria);
    let { folder, isRead, showAll, txt } = criteria
    let filteredMails = mails;
    txt = txt.toLowerCase();
    if (folder === 'inbox') filteredMails = filteredMails.filter(mail => mail.to === gLoggedinUser.email 
        && !mail.trash && !mail.draft)
    else if (folder === 'send') filteredMails = filteredMails.filter(mail => mail.from === gLoggedinUser.email 
        && !mail.trash && !mail.draft)
    else if (folder === 'drafts') filteredMails = filteredMails.filter(mail => mail.draft && !mail.trash)
    else if (folder === 'trash') filteredMails = filteredMails.filter(mail => mail.trash)
    if (!showAll) {
        if (isRead) filteredMails = filteredMails.filter(mail => mail.isRead)
        else filteredMails = filteredMails.filter(mail => !mail.isRead)
    }
    if (txt) filteredMails = filteredMails.filter(mail => mail.subject.toLowerCase().includes(txt)
        || mail.body.toLowerCase().includes(txt))

    return filteredMails;
}

// function saveMail(mailToSave) {
//     return mailToSave.id ? _updateMail(mailToSave) : _addMail(mailToSave)
// }

// function _addMail(mailToSave) {
//     let mails = _loadMailsFromStorage()
//     var mail = createMail(mailToSave)
//     mails = [mail, ...mails]
//     _saveMailsToStorage(mails);
//     return Promise.resolve()
// }

function updateMail(mailToSave) {
    let mails = _loadMailsFromStorage()
    var mailIdx = mails.findIndex(function (mail) {
        return mail.id === mailToSave.id;
    })
    mails[mailIdx] = mailToSave
    _saveMailsToStorage(mails);
    return Promise.resolve()
}

function removeMail(mailId) {
    let mails = _loadMailsFromStorage()
    let mailIdx = mails.findIndex(mail => mail.id === mailId)
    if (!mails[mailIdx].trash) mails[mailIdx].trash = true;
    else mails.splice(mailIdx, 1);
    _saveMailsToStorage(mails);
    return Promise.resolve()
}


function getMailById(mailId) {
    const mails = _loadMailsFromStorage()
    var mail = mails.find(function (mail) {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}


function createMail(mailToSave) {
    mailToSave.id = utilService.makeId();
    mailToSave.from = gLoggedinUser.email;
    mailToSave.isRead = false;
    mailToSave.sentAt = Date.now();
    mailToSave.trash = false;
    console.log('from service: ',mailToSave)
    
    let mails = _loadMailsFromStorage()
    mails.push(mailToSave);
    _saveMailsToStorage(mails);
}

function _createMails() {
    var mails = _loadMailsFromStorage()
    if (!mails || !mails.length) {
        mails = [
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes' + utilService.makeLorem(20),
                isRead: false,
                sentAt: 1551133930594,
                from: 'popo@popo.com',
                to: 'harvona.50forearm@appsus.com',
                draft: false,
                trash: false
            },
            {
                id: utilService.makeId(),
                subject: 'Love you!',
                body: 'Would love to catch up sometimes hrhhrhrh lloamin ajvna re thrtg EC EAGT THWW  arg tgrth sht',
                isRead: false,
                sentAt: Date.now(),
                from: 'harvona.50forearm@appsus.com',
                to: 'popo@popo.com',
                draft: false,
                trash: false
            },
            {
                id: utilService.makeId(),
                subject: 'call you!',
                body: 'Would love to catch up sometimes' + utilService.makeLorem(20),
                isRead: false,
                sentAt: 1551133930594,
                from: 'popo@popo.com',
                to: 'harvona.50forearm@appsus.com',
                draft: false,
                trash: false,
            },
        ]
    }
    _saveMailsToStorage(mails);
}

function _saveMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadMailsFromStorage() {
    return storageService.loadFromStorage(KEY)
}
