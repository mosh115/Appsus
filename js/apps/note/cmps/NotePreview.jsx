import { utilService } from "../../../services/util.service.js";

const { Link } = ReactRouterDOM

export function DynamicCmp(props) {
    // console.log('props dynamic', props);
    switch (props.type) {
        case 'note-txt':
            return <NoteTxt {...props} />
        case 'note-img':
            return <NoteImg {...props} />
        case 'note-todos':
            return <NoteTodos {...props} />
        case 'note-video':
            return <NoteVideo {...props} />
        default:
            return <React.Fragment></React.Fragment>
    }
}

export function NoteTxt({ note }) {

    return (
        <article className="note-text" >
            <h3>{note.title}</h3>
            <p>{note.info.txt}</p>
        </article>
    )
}
export function NoteImg({ note }) {

    return (
        <article className="note-text" >
            <img src={note.info.url} alt="image" />
            <h3>{note.title}</h3>

        </article>
    )
}
export function NoteVideo({ note }) {

    return (
        <article className="note-text" >
            <iframe className="video-player" width="100%" src={note.info.url}>
            </iframe>
            <h3>{note.title}</h3>

        </article>
    )
}
export function NoteTodos({ note }) {

    return (
        <article className="note-text" >

            <h3>{note.title}</h3>
            <ul>
                {note.info.todos.map(todo => {
                    return <li className={todo.isDone ? 'todo-done' : ''} key={utilService.makeId(3)}>{todo.txt}</li>
                })
                }

            </ul>
        </article>
    )
}





export function NotePreview({ note }) {
    return (
        <section className="note-preview">
            <Link className="clean-link" to={`/note/${note.id}`}>
                <DynamicCmp type={note.type} note={note} />
                {/* <article className="note-text">
                    <h3>{note.title}</h3>
                    <p>{note.info.txt}</p>
                </article> */}
            </Link>
            <div className="note-actions">

            </div>

        </section>
    )
}