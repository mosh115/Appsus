import { mailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM;

export class MailDetails extends React.Component {
    state = {
        mail: null,
    }

    componentDidMount() {
        this.loadMail();
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getMailById(mailId)
            .then(mail => {
                if (!mail) return this.props.history.push('/mail');
                if (!mail.isRead) {
                    mail.isRead = true;
                    mailService.updateMail(mail).then(() => { })
                }
                this.setState({ mail })
            })
    }

    onRemovaMail = () => {
        mailService.removeMail(this.state.mail.id)
            .then(() => { this.props.history.push('/mail') })
    }

    render() {
        let { mail } = this.state;
        if (!mail) return <h1>Loading...</h1>
        return (
            <section className="mail-details">
                <header className="flex justify-space-between">
                    <button><Link className="clean-link back" to="/mail">back to list</Link></button>
                    <button onClick={this.onRemovaMail}>delete mail</button>
                </header>
                <h1>{mail.subject}</h1>
                <p>from: {mail.from}</p>
                <p>{mail.body}</p>
            </section>
        )
    }
}