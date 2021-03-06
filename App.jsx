import { AppHeader } from './js/cmps/AppHeader.jsx'
import { AppFooter } from './js/cmps/AppFooter.jsx'
import { Home } from './js/pages/Home.jsx'
import { About } from './js/pages/About.jsx'
import { MailApp } from './js/apps/mail/pages/MailApp.jsx'
import { NoteIndex } from './js/apps/note/pages/NoteIndex.jsx'
// import { BookApp } from './js/apps/note/pages/NoteIndex'


import { NoteDetails } from './js/apps/note/pages/NoteDetails.jsx'
// import { CarEdit } from './pages/CarEdit.jsx'
import { UserMsg } from './js/cmps/user-msg.jsx'


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM



export function App() {

  return (
    <Router >
      <section className="app" >
        <AppHeader />
        <main>
          <Switch>
            {/* <Route component={CarEdit} path="/car/edit/:carId?" /> */}
            {/* <Route component={NoteDetails} path="/note/:noteId" /> */}
            <Route component={MailApp} path="/mail" />
            <Route component={NoteIndex} path="/note" />
            {/* <Route component={BookApp} path="/book" /> */}
            <Route component={About} path="/about" />
            <Route component={Home} path="/" />
          </Switch>
        </main>
      </section>
      <AppFooter />
      <UserMsg />
    </Router>
  );
}



