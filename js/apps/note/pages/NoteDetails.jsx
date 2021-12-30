import { noteService } from "../services/note.service.js";
// import { eventBusService } from "../services/event-bus.service.js";


const { Link } = ReactRouterDOM

export class noteDetails extends React.Component {

    state = {
        note: null
    }

    componentDidMount() {
        // console.log('props in noteDetails', this.props);
        this.loadnote()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.noteId !== this.props.match.params.noteId) {
            this.loadnote()
        }
    }

    loadnote = () => {
        const { noteId } = this.props.match.params
        // console.log('noteId in noteDetails', noteId);
        noteService.getnoteById(noteId).then(note => {
            if (!note) return this.props.history.push('/')
            this.setState({ note })
        })
    }

    onGoBack = () => {
        this.props.history.push('/note')
    }

    onRemovenote = () => {
        const { id } = this.state.note
        noteService.removeNote(id).then(() => {
            // eventBusService.emit('user-msg', { txt: 'note is deleted !', type: 'danger' })
            this.onGoBack()
        })
    }

    render() {
        const { note } = this.state
        if (!note) return <h1>Loading note..</h1>
        return (
            <section className="note-details" >
                <Link className="primary-btn clean-link" to={`/note/edit/${note.id}`}>Edit note</Link>
                <img src={`https://robohash.org/${note.id}`} alt="" />
                <h2>Vendor: {note.vendor}</h2>
                <h2>Speed: {note.speed}</h2>
                <p>{note.desc}</p>
                <button className="primary-btn" onClick={this.onGoBack}>Go back</button>
                <button className="primary-btn" onClick={this.onRemovenote}>Remove note</button>
                <Link className="primary-btn clean-link" to={`/note/${noteService.getNextnoteId(note.id)}`}>Next note</Link>
            </section>
        )
    }
}