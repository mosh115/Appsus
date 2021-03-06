import { eventBusService } from "../../../services/event-bus.service.js"


const { Link } = ReactRouterDOM;

export class MailFolders extends React.Component {
    state = {
        criteria: {
            folder: 'inbox',
            txt: '',
            showAll: true,
            isRead: false,
        }
    }

    onSelectFolder = (folder) => {
        this.setState((prevState) => ({ criteria: { ...prevState.criteria, folder: folder } }), () => {
            eventBusService.emit('filter-change', (this.state.criteria))
            // this.props.history.push("/mail") 
        })
        // console.log('from select folder',this.state.criteria); //logs prev click
    }

    onHandleSearch = ({ target }) => {
        this.setState((prevState) => ({ criteria: { ...prevState.criteria, txt: target.value } }), () => {
            eventBusService.emit('filter-change', (this.state.criteria))
        })
    }

    render() {

        return (
            <React.Fragment>
                <section className="folder-container">
                    <h2 onClick={() => this.onSelectFolder('inbox')}>Inbox</h2>
                    <h2 onClick={() => this.onSelectFolder('send')}>Send</h2>
                    <h2 onClick={() => this.onSelectFolder('drafts')}>Drafts</h2>
                    <h2 onClick={() => this.onSelectFolder('trash')}>trash</h2>
                </section>
                    
                    <input className="search-input" type="text" placeholder="search in mail" onChange={this.onHandleSearch} />
            </React.Fragment>
        )
    }
}