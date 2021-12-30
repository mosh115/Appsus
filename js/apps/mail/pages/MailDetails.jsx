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
        console.log('carId in CarDetails', mailId);
        mailService.getMailById(mailId).then(mail => {
            if (!mail) return this.props.history.push('/mail')
            this.setState({ mail })
        })
    }

    onRemoveMail = () => {
        mailService.removeMail(this.state.mail.id)
            .then(() => { this.props.history.push('/mail') })
    }

    render() {
        let { mail } = this.state;
        if (!mail) return <h1>Loading...</h1>
        return (
            <section className="mail-details">
                <button onClick={this.onRemoveMail}>delete mail</button>
                <Link to="/mail">back to list</Link>
                <h1>{mail.subject}</h1>
                <p>{mail.from}</p>
                <p>{mail.body}</p>
            </section>
        )
    }
}