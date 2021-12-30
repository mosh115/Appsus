

export function MailPreview({ mail }) {
    let isRead = mail.isRead ? 'read' : 'unread';
    // console.log(mail)
    let atIndex = mail.from.indexOf('@');
    let name = mail.from.slice(0, atIndex);

    let now = new Date();
    let mailTime = new Date(mail.sentAt);
    let isTody = false;
    let isYear = now.getFullYear() === mailTime.getFullYear() ? true : false;
    if (now.getDate() === mailTime.getDate() && now.getMonth() === mailTime.getMonth()) {
        isTody = true;
    }
    let timeToShow;
    if (isTody && isYear) {
        let time = mailTime.toLocaleTimeString();
        let idxSecondColon = time.indexOf(':', 3)
        timeToShow = time.slice(0, idxSecondColon)
    } else if (isYear) {
        let date = mailTime.toLocaleDateString()
        let dateArr = date.split('.');
        timeToShow = `${dateArr[0]}.${dateArr[1]}`
    } else timeToShow = mailTime.toLocaleDateString();
    
    return (
        <section className={`mail-preview ${isRead} flex justify-space-between`} >
            <p className="name">{name}</p>
            <p className="subject"> {mail.subject.slice(0, 25)}</p>
            <p className="mail-time">{timeToShow}</p>
        </section>
    )
}