import { AppHeader } from './js/cmps/AppHeader.jsx'
import { AppFooter } from './js/cmps/AppFooter.jsx'
import { Home } from './js/pages/Home.jsx'
import { About } from './js/pages/About.jsx'
import { MailApp } from './js/apps/mail/pages/MailIndex.jsx'
import { NoteApp } from './js/apps/note/pages/NoteIndex.jsx'
// import { BookApp } from './js/apps/note/pages/NoteIndex'


// import { CarDetails } from './pages/CarDetails.jsx'
// import { CarEdit } from './pages/CarEdit.jsx'
// import { UserMsg } from './cmps/UserMsg.jsx'


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM



export function App() {

  return (
    <Router >
      <section className="app" >
        <AppHeader />
        <main>
          <Switch>
            {/* <Route component={CarEdit} path="/car/edit/:carId?" />
            <Route component={CarDetails} path="/car/:carId" /> */}
            <Route component={MailApp} path="/mail" />
            <Route component={NoteApp} path="/note" />
            {/* <Route component={BookApp} path="/book" /> */}
            <Route component={About} path="/about" />
            <Route component={Home} path="/" />
          </Switch>
        </main>
      </section>
      <AppFooter />
      {/* <UserMsg /> */}
    </Router>
  );
}



{/* <CarApp /> */ }