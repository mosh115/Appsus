
const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header">

            <h1>Appsus</h1>

            <nav className="main-nav">
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Notes</NavLink>
                <NavLink to="/book">Books</NavLink>
            </nav>
        </header>
    )
}