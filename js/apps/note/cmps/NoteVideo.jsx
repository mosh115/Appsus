import { noteService } from "../services/note.service.js";

export class NoteVideo extends React.Component {
    state = {
        note: this.props.note,
        isEditMode: false

    }

    handleMouseLeave = () => {
        const { note, isEditMode } = this.state
        this.setState((prevState) => ({ ...prevState, isEditMode: !prevState.isEditMode }))
    }

    componentDidUpdate() {
        const { note, isEditMode } = this.state
        noteService.saveNote(note).then(() => {

            // eventBusService.emit('user-msg', { txt: 'Saved !', type: 'success' })
        })
    }

    handleMouseHover = () => {
        this.setState((prevState) => ({ ...prevState, isEditMode: !prevState.isEditMode }))

    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ note: { ...prevState.note, [field]: value } }))
    }

    handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }


    render() {

        const { note, isEditMode } = this.state

        if (!note) return <h1>Loading..</h1>
        return (
            <article className="note-text" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseLeave} >
                <textarea className="title" placeholder="Add title" name="title" value={note.title} onKeyDown={this.handleKeyDown} onChange={this.handleChange} >{note.title}</textarea>

                <iframe className="video-player" width="100%" src={note.url}>
                </iframe>
            </article>
        )
    }
}
