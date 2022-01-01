
import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onLoadNotes }) {
    // no notes for show
    if (!notes.length) return <h1>There are no notes to show</h1>
    return (
        <section className="note-list">
            {notes.map(note => <NotePreview key={note.id} note={note} onLoadNotes={onLoadNotes} />)}
        </section>
    )
}