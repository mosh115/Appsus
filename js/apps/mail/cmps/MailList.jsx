import { MailPreview } from "./MailPreview.jsx";


export function MailList({mails}) {
    return (
        <section className="mail-list">
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
        </section>
    )
}