import { mailService } from "../services/mail.service.js"
// import { utilService } from "../../../services/util.service"

export class NewMail extends React.Component {
    state = {
        mail: {
            // id: utilService.makeId(),
        }
    }
    // interval = setInterval()


    onCloseModal = () => {
        this.props.toggleNewMail();
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type
        this.setState((prevState) => ({ mail: { ...prevState.mail, [field]: value } }))
    }

    render() {
        return (
            <section className="new-mail">
                <header className="header flex justify-space-between">
                    <h4>new messege</h4>
                    <button onClick={this.onCloseModal}>x</button>
                </header>
                <input type="text" placeholder="to:" name="to" autoComplete="on" onChange={this.handleChange}/>
                <input type="text" placeholder="subject:" name="subject" onChange={this.handleChange}/>
                <textarea name="body" id="" cols="70" rows="10" onChange={this.handleChange}></textarea>
            </section>
        )
    }
}