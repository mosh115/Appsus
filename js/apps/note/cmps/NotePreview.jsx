const { Link } = ReactRouterDOM

export function NotePreview({ note }) {
    return (
        <section className="note-preview">
            <Link className="clean-link" to={`/note/${note.id}`}>
                <article className="note-text">
                    <h3>{note.title}</h3>
                    <p>{note.info.txt}</p>
                </article>
                <div className="note-actions">

                </div>
            </Link>
        </section>
    )
}