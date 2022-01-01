import { noteService } from "../services/note.service.js";

export class NoteTxt extends React.Component {
    state = {
        note: this.props.note
    }
    handleMouseLeave = () => {
        const { note } = this.state
        noteService.saveNote(note).then(() => {

            // eventBusService.emit('user-msg', { txt: 'Saved !', type: 'success' })
        })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ note: { ...prevState.note, [field]: value } }))
    }

    handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        // In case you have a limitation
        // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
    }

    render() {
        const { note } = this.state
        if (!note) return <h1>Loading..</h1>
        return (
            <article className="note-text" onMouseLeave={this.handleMouseLeave} >
                {/* <textarea className="title">{note.title}</textarea> */}
                <textarea className="title" placeholder="Add title" name="title" value={note.title} onKeyDown={this.handleKeyDown} onChange={this.handleChange} >{note.title}</textarea>
                <textarea className="txt" placeholder="Add here some txt" name="txt" value={note.txt} onKeyDown={this.handleKeyDown} onChange={this.handleChange} >{note.txt}</textarea>
            </article>
        )
    }
}