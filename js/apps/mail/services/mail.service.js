import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    removeMail,
    saveMail,
    getMailById,
}

const KEY = 'mailDB';

_createMails();

function query(filterBy = null) {
    const mails = _loadCMailsFromStorage()
    if (!filterBy) return Promise.resolve(mails)
    const filteredMails = _getFilteredMalis(mails, filterBy)
    return Promise.resolve(filteredMails)

}

function _getFilteredMalis(cars, filterBy) {
    // let { vendor, minSpeed, maxSpeed } = filterBy
    // minSpeed = minSpeed ? minSpeed : 0
    // maxSpeed = maxSpeed ? maxSpeed : Infinity
    // return cars.filter(car => {
    //     return car.vendor.includes(vendor) && car.speed >= minSpeed && car.speed <= maxSpeed
    // })
}

function saveMail(mailToSave) {
    return mailToSave.id ? _updateMail(mailToSave) : _addMail(mailToSave)
}

function _addMail(mailToSave) {
    let mails = _loadCMailsFromStorage()
    var mail = _createMail(mailToSave)
    mails = [mail, ...mails]
    _saveMailsToStorage(mails);
    return Promise.resolve()
}

function _updateMail(mailToSave) {
    const mails = _loadCMailsFromStorage()
    var mailIdx = mails.findIndex(function (mail) {
        return mail.id === mailToSave.id;
    })
    mails[mailIdx] = mailToSave
    _saveMailsToStorage(mails);
    return Promise.resolve()
}

function removeMail(mailId) {
    let mails = _loadCMailsFromStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _saveMailsToStorage(mails);
    return Promise.resolve()
}


function getMailById(mailId) {
    const mails = _loadCMailsFromStorage()
    var mail = mails.find(function (mail) {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}


function _createMail(mailToSave) {
    if (!mailToSave.speed) mailToSave.speed = utilService.getRandomIntInclusive(1, 200)
    return {
        id: utilService.makeId(),
        ...mailToSave,
        desc: utilService.makeLorem(),
        ctg: Math.random() <= 0.6 ? 'bestSelling' : ''
    }
}

function _createMails() {
    var mails = _loadCMailsFromStorage()
    if (!mails || !mails.length) {
        mails = []
        gVendors.forEach(vendor => {
            const mailToSave = { vendor }
            mails.push(_createMail(mailToSave))
        })
    }
    _saveMailsToStorage(mails);
}

function _saveMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadCMailsFromStorage() {
    return storageService.loadFromStorage(KEY)
}
