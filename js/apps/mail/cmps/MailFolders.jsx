

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
            this.props.reload(this.state.criteria)
        })
        // console.log('from select folder',this.state.criteria); //logs prev click
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
                <section className="searc-input">
                    {/* <input type="text" placeholder="search in mail" onChange={}/> */}
                </section>
            </React.Fragment>
        )
    }
}