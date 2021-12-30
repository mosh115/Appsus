import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolders } from '../cmps/MailFolders.jsx'

import { mailService } from '../services/mail.service.js'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM



export class MailApp extends React.Component {
    state = {
        mails: null,
    }

    componentDidMount() {
        this.loadMails()
    }
    defualtCriteria = {
        folder: 'inbox',
        txt: '',
        showAll: true, //raed and unread
        isRead: false, 
    }

    loadMails = (criteria = this.defualtCriteria) => {
        mailService.query(criteria)
            .then((mails) => this.setState({ mails }))
    }

    render() {
        let { mails } = this.state;
        if (!mails) return <h1>Loading...</h1>
        return (
            <section className="mail-app" >
                <MailList mails={mails} />
                <MailFolders reload={this.loadMails}/>
            </section>
        )
    }
}
