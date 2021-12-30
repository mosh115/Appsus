

export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            txt: '',
            type: ''
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
        this.cleanForm()
    }

    cleanForm = () => {
        this.setState({ filterBy: { txt: '' } })
    }

    render() {
        const { filterBy: { txt, type } } = this.state
        return (
            <form className="note-filter" onSubmit={this.onSubmitFilter}>
                {/* <label
                    htmlFor="by-text">Search:</label> */}
                <input
                    placeholder="Search note..."
                    type="text"
                    id="by-text"
                    name="txt"
                    value={txt}
                    onChange={this.handleChange} />
                {/* <label
                    htmlFor="Filter">Filter by:</label>
                <select name="type" value={type} onChange={this.handleChange}>
                    <option value="">All</option>
                    <option value="note-txt">Text</option>
                    <option value="note-img">Image</option>
                    <option value="note-video">Video</option>
                    <option value="note-todos">Todos</option>
                </select> */}
            </form>

        )
    }
}