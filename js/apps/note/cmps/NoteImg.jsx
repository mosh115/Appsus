import { noteService } from "../services/note.service.js";

export class NoteImg extends React.Component {
    state = {
        note: this.props.note,
        isEditMode: false,
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
        // In case you have a limitation
        // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
    }

    editImgSrc = () => {
        this.setState((prevState) => ({ ...prevState, isEditMode: !prevState.isEditMode }))
    }

    render() {

        const { note, isEditMode } = this.state
        const editImg = <input placeholder="Enter img url" name="url" type="url" value={note.url} onChange={this.handleChange} />
        if (!note) return <h1>Loading..</h1>
        return (
            <article className="note-text" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseLeave} >
                <textarea className="title" placeholder="Add title" name="title" value={note.title} onKeyDown={this.handleKeyDown} onChange={this.handleChange} >{note.title}</textarea>
                <img src={note.url} alt="image" onClick={this.editImgSrc} />
                {/* {isEditMode ? editImg : <span>&nbsp;&nbsp;</span>} */}
                <input placeholder="Enter img url" name="url" type="url" value={note.url} onChange={this.handleChange} />
                {/* <button>Change image</button> */}
                {/* {isEditMode && } */}
            </article>
        )
    }
}