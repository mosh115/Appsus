import { noteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

// const { Link } = ReactRouterDOM

export class NoteIndex extends React.Component {

    state = {
        notes: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadnotes()
    }

    get ctgSearchParam() {
        const urlSearchParams = new URLSearchParams(this.props.location.search)
        return urlSearchParams.get('ctg')
    }

    get notesToDisplay() {
        const { notes } = this.state
        const ctg = this.ctgSearchParam
        return notes.filter(note => !ctg || note.ctg === ctg)
    }


    loadnotes = () => {
        const { filterBy } = this.state
        noteService.query(filterBy).then(notes => {
            this.setState({ notes })
        })

    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadnotes)
    }




    render() {
        const { notes } = this.state

        if (!notes) return <h1>Loading notes..</h1>
        return (
            <section className="note-index">
                <NoteFilter onSetFilter={this.onSetFilter} />
                <div className='add-note'>
                    Take a note...
                    <div className='btn-actions'>
                        <button className='new-list' title='New list' ></button>
                        <button className='new-img' title='New note with image'></button>
                        <button className='new-video' title='New note with video'></button>
                    </div>
                </div>
                <NoteList notes={this.notesToDisplay} />
                <NoteEdit />
            </section>
        )
    }
}
