import { MailPreview } from "./MailPreview.jsx";
import { mailService } from '../services/mail.service.js'
import {eventBusService} from "../../../services/event-bus.service.js"


export class MailList extends React.Component {
    state = {
        mails: null,
    }
    
    componentDidMount() {
        this.loadMails();
        eventBusService.on('filter-change', (criteria) => {
            this.loadMails(criteria)
        })
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
        let {mails}  = this.state;
        if (!mails) return <h1>Loading...</h1>
        return (
            <section className="mail-list">
                {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
            </section>
        )
    }
}