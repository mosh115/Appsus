import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    removeNote,
    saveNote,
    getnoteById,
    copyNote
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
                title: 'I am the first note!',
                txt: 'Fullstack Me Baby!',
                style: '#F9D371'
            },
            {
                id: utilService.makeId(),
                type: 'note-video',
                isPinned: false,
                title: 'Mix 2022 new year',
                url: 'https://www.youtube.com/embed/3FKtI2OaymM',
                style: '#73A3F2'
            },

            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                title: "Happy new year!",
                url: "https://srcwap.com/wp-content/uploads/2019/06/happy-new-year-2022-HD-gif-download-1.gif",
                style: '#d47740'
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                title: 'programmers jokes',
                txt: 'The trouble with programmers is that you can never tell what a programmer is doing until its too late'

            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: true,
                title: "Things to Master",
                style: '#C7D9B7',
                todos: [
                    { txt: "Learn HTML", isDone: true },
                    { txt: "Learn CSS", isDone: true },
                    { txt: "Learn JS", isDone: true },
                    { txt: "Learn React", isDone: true },
                    { txt: "Learn NodeJS", isDone: false },
                    { txt: "Learn Veu", isDone: false },
                    { txt: "Learn Angular", isDone: false },
                ]

            },

            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                title: "Robi the king",
                url: "https://robohash.org/dscdsv",
                style: '#F47340'
            },
            {
                id: utilService.makeId(),
                type: 'note-video',
                isPinned: false,
                title: 'My new playlist',
                url: 'https://www.youtube.com/embed/tgbNymZ7vqY',
                style: '#8843F2'
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: true,
                title: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", isDone: true },
                    { txt: "Coding power", isDone: false }
                ]

            }
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

function copyNote(noteId) {
    let notes = _loadNotesFromStorage()
    let noteIdx = notes.findIndex((note) => note.id === noteId);
    let notesCopy = JSON.parse(JSON.stringify(notes));
    let noteCopy = notesCopy.copyWithin(0, noteIdx, noteIdx + 1).shift();
    noteCopy.id = utilService.makeId();
    notes.push(noteCopy);
    _saveNotesToStorage(notes);
    return Promise.resolve();
}

function getnoteById(noteId) {
    const notes = _loadNotesFromStorage()
    let note = notes.find((note) => {
        return noteId === note.id
    })
    return Promise.resolve(note)
}

function _getFilteredNotes(notes, filterBy) {
    let { txt, type } = filterBy


    console.log('filter in service', type, txt);
    return notes.filter(note => {
        // if (note.type === 'note-txt')
        return note.title.toLowerCase().includes(txt.toLowerCase())
        // && note.type === type
        // else if (note.type === 'note-img' || note.type === 'note-video') return note.title.includes(txt)
        // else if (note.type === 'note-todos') return note.title.includes(txt)
    })
}


function _addNote(noteToSave) {
    let notes = _loadNotesFromStorage()
    var note = _createNote(noteToSave)
    notes = [note, ...notes]
    _saveNotesToStorage(notes);
    return Promise.resolve()
}

function _updateNote(noteToSave) {
    // if (noteToSave.type === 'note-video') {
    //     const videoId = noteToSave.url.replace('https://www.youtube.com/watch?v=', '')
    //     const url = `https://www.youtube.com/embed/${videoId}`
    //     noteToSave.url = url
    // }
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