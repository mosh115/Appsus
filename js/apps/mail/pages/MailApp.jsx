import { MailList } from '../cmps/MailList.jsx'
import { MailFolders } from '../cmps/MailFolders.jsx'
import { MailDetails } from '../pages/MailDetails.jsx'

import { mailService } from '../services/mail.service.js'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Redirect } = ReactRouterDOM



export class MailApp extends React.Component {          //kcould be functoin
   
    render() {
    
        return (
            <section className="mail-app" >
                <Switch>
                    <Route component={MailList} path="/mail/list" />
                    <Route component={MailDetails} path="/mail/:mailId" />
                    <Redirect from="/mail" to="/mail/list" />
                </Switch>
                <MailFolders reload={this.loadMails} />
            </section>
        )
    }
}
