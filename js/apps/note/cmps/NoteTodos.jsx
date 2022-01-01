import { noteService } from "../services/note.service.js";
import { utilService } from "../../../services/util.service.js";

export class NoteTodos extends React.Component {
    state = {
        note: this.props.note,
        isEditMode: false,
    }

    handleMouseLeave = () => {
        const { note, isEditMode } = this.state
        this.setState((prevState) => ({ ...prevState, isEditMode: !prevState.isEditMode }))

        // noteService.saveNote(note).then(() => {
        //     console.log('note saved');
        //     // eventBusService.emit('user-msg', { txt: 'Saved !', type: 'success' })
        // })
    }

    componentDidUpdate() {
        const { note } = this.state
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

    // editImgSrc = () => {
    //     this.setState((prevState) => ({ ...prevState, isEditMode: !prevState.isEditMode }))
    // }

    toggleTodo = (idx) => {
        let { note } = this.state
        let todos = note.todos;
        let currTodo = todos[idx];
        currTodo.isDone = !currTodo.isDone;
        todos[idx] = currTodo;
        note.todos = todos

        this.setState({ note })

    }

    render() {

        const { note, isEditMode } = this.state

        if (!note) return <h1>Loading..</h1>
        return (
            <article className="note-text todos" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseLeave} >
                <textarea className="title" placeholder="Add title" name="title" value={note.title} onKeyDown={this.handleKeyDown} onChange={this.handleChange} >{note.title}</textarea>
                <ul className="">
                    {note.todos.map((todo, idx) => {
                        return <div key={idx + 5000} className="flex justify-space-between">
                            <li onClick={() => this.toggleTodo(idx)} className={todo.isDone ? 'todo-done' : ''} key={idx}>{todo.txt}</li>
                            <button className="btn-remove-todo" key={idx + 30}> <img className="img-remove-todo" key={idx + 100} src="data:image/png;base64,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" /></button>
                        </div>
                    })
                    }

                </ul>
            </article>
        )
    }
}

