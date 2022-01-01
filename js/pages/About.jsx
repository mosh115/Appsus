const { NavLink, Route, Switch } = ReactRouterDOM

function AboutTeam() {
    return (
        <div className="team-about">
            <ol className=" team clean-list flex"  >
                <li>Tzvi Fraenkel <img className="about-img" src="../../img/tzvi-photo.jpeg" alt="" /></li>
                <li>Moshe Rozner <img className="about-img" src="../../img/moshe-rozner.jpg" alt="" /></li>

            </ol>
        </div>
    )
}

function AboutVision() {
    return (
        <div className="vision">
            <h4 >Our Vision</h4>
            <ul className="clean-list">
                <li>Sleep</li>
                <li>Sleep</li>
                <li>Sleep</li>
                <li>Repeat()</li>
            </ul>
        </div>
    )
}

export function About() {
    return <section className="about clean-link">


        <img className="img-cover" src="../../img/background.jpg" />
        <p>After only 4 days of learning react,</p>
        <p>We build this useful app in 2.5 days.</p>
        <nav >
            <NavLink className="clean-link" to="/about/team">Team</NavLink>
            <NavLink className="clean-link" to="/about/vision">Vision</NavLink>
        </nav>

        <Switch>
            <Route component={AboutTeam} path="/about/team" />
            <Route component={AboutVision} path="/about/vision" />
        </Switch>
    </section>
}