
import { noteService } from "../services/note.service.js";
// import { eventBusService } from "../services/event-bus.service.js";


export class NoteEdit extends React.Component {
    state = {
        note: {

        }
    }

    inputRef = React.createRef()

    componentDidMount() {
        // this.inputRef.current.focus()
        // this.loadnote()
    }

    loadnote = () => {
        const { noteId } = this.props.match.params
        if (!noteId) return
        // console.log('noteId in noteDetails', noteId);
        noteService.getnoteById(noteId).then(note => {
            if (!note) return this.props.history.push('/note')
            this.setState({ note })
        })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ note: { ...prevState.note, [field]: value } }))
    }

    onGoBack = () => {
        this.props.history.push('/note')
    }

    onSavenote = (ev) => {
        ev.preventDefault()
        const { note } = this.state
        noteService.saveNote(note).then(() => {
            // eventBusService.emit('user-msg', { txt: 'Saved !', type: 'success' })
            this.onGoBack()
        })
    }

    render() {
        // const { id } = this.state.note
        return (
            <section className="note-edit">

                <h1>note</h1>
                {/* <h1>{id ? 'Edit' : 'Add'} note</h1> */}
                {/* <form onSubmit={this.onSavenote} >
                    <label htmlFor="by-vendor">Vendor:</label>
                    <input ref={this.inputRef} placeholder="Enter vendor" name="vendor" type="text" id="by-vendor" value={vendor} onChange={this.handleChange} />
                    <label htmlFor="by-speed">Speed:</label>
                    <input placeholder="Enter speed" name="speed" type="number" id="by-speed" value={speed} onChange={this.handleChange} />
                    <button className="primary-btn ">Save note</button>
                </form> */}
            </section>
        )
    }

}