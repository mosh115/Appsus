import { mailService } from "../services/mail.service.js"

export class NewMail extends React.Component {
    state = {
        mail: {
            to: '',
            subject: '',
            body: ''
        }
    }
    // interval = setInterval()


    onCloseModal = () => {
        this.props.toggleNewMail();
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ mail: { ...prevState.mail, [field]: value } }))
    }

    onNewMail = (isDraft) => {
        // console.log(isDraft)
        // let draft = (isDraft === 'draft') ? true : false;
        this.setState((prevState) => ({ mail: { ...prevState.mail, draft: isDraft } }), () => {
            mailService.createMail(this.state.mail);
            this.onCloseModal();
        })
    }

    render() {
        let { to, subject, body } = this.state.mail
        return (
            <section className="new-mail">
                <header className="header flex justify-space-between">
                    <h4>new messege</h4>
                    <button onClick={this.onCloseModal}>x</button>
                </header>
                <input type="text" placeholder="to:" name="to" autoComplete="on" onChange={this.handleChange} value={to} />
                <input type="text" placeholder="subject:" name="subject" onChange={this.handleChange} value={subject} />
                <textarea name="body" id="" cols="70" rows="10" onChange={this.handleChange} value={body}></textarea>
                <footer className="footer flex justify-space-between">
                    <button onClick={() => this.onNewMail(false)}>send</button>
                    <button onClick={() => this.onNewMail(true)}>save</button>
                </footer>
            </section>
        )
    }
}