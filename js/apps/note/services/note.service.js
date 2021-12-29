import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    removeNote,
    saveNote,
    getnoteById,
}


const KEY = 'noteDB';


_createNotes()


function _createNotes() {
    let notes = _loadNotesFromStorage()
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: true,
                title: 'Test note',
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                title: 'Things to Master',
                info: {
                    txt: 'Learn NodeJs!'
                }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                title: utilService.makeLorem(5),
                info: {
                    txt: utilService.makeLorem(30)
                }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                title: utilService.makeLorem(5),
                info: {
                    txt: utilService.makeLorem(16)
                }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: true,
                title: 'Test note',
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                title: 'Things to Master',
                info: {
                    txt: 'Learn NodeJs!'
                }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                title: utilService.makeLorem(5),
                info: {
                    txt: utilService.makeLorem(30)
                }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                title: utilService.makeLorem(5),
                info: {
                    txt: utilService.makeLorem(16)
                }
            },
            // {
            //     id: utilService.makeId(),
            //     type: "note-img",
            //     isPinned: false,
            //     info: {
            //         url: "http://some-img/me",
            //         title: "Bobi and Me"
            //     },
            //     style: {
            //         backgroundColor: "#00d"
            //     }
            // },
            // {
            //     id: utilService.makeId(),
            //     type: "note-todos",
            //     isPinned: true,
            //     info: {
            //         label: "Get my stuff together",
            //         todos: [
            //             { txt: "Driving liscence", doneAt: null },
            //             { txt: "Coding power", doneAt: 187111111 }
            //         ]
            //     }
            // }
        ];
    }
    _saveNotesToStorage(notes);
}

function _createNote(noteToSave) {
    return {
        id: utilService.makeId(),
        ...noteToSave,
    }
}

function query(filterBy = null) {
    const notes = _loadNotesFromStorage()
    if (!filterBy) return Promise.resolve(notes)
    const filteredNotes = _getFilteredNotes(notes, filterBy)
    return Promise.resolve(filteredNotes)

}
function saveNote(noteToSave) {
    return noteToSave.id ? _updateNote(noteToSave) : _addNote(noteToSave)
}

function removeNote(noteId) {
    let notes = _loadNotesFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveNotesToStorage(notes);
    return Promise.resolve()
}

function getnoteById(noteId) {
    const notes = _loadNotesFromStorage()
    let note = notes.find((note) => {
        return noteId === note.id
    })
    return Promise.resolve(note)
}

function _getFilteredNotes(notes, filterBy) {
    // let { vendor, minSpeed, maxSpeed } = filterBy
    // minSpeed = minSpeed ? minSpeed : 0
    // maxSpeed = maxSpeed ? maxSpeed : Infinity
    // return notes.filter(note => {
    //     return car.vendor.includes(vendor) && car.speed >= minSpeed && car.speed <= maxSpeed
    // })
}


function _addNote(noteToSave) {
    let notes = _loadNotesFromStorage()
    var note = _createNote(noteToSave)
    notes = [note, ...notes]
    _saveNotesToStorage(notes);
    return Promise.resolve()
}

function _updateNote(noteToSave) {
    const notes = _loadNotesFromStorage()
    let noteIdx = notes.findIndex(function (note) {
        return note.id === noteToSave.id;
    })
    notes[noteIdx] = noteToSave
    _saveNotesToStorage(notes);
    return Promise.resolve()
}

function _saveNotesToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(KEY)
}