import "../css/Home.css"
import icon from "/main-icon.png"

const Home = () => {
    return(
        <div id="home">
            <div id="datatabs">
                <div className="datatab">
                    <div className="datatabtext">
                        IP-Adresse: asdf{}
                    </div>
                    <div className="datatabtext">
                        Name: asdf{}
                    </div>
                </div>
                <div className="datatab">
                    <div className="datatabtext">
                        Gefahrene Strecke: asdf{}
                    </div>
                    <div className="datatabtext">
                        Betriebsdauer: asdf{}
                    </div>
                </div>
                <img id="homemainicon" src={icon} alt="MBot Icon" />
            </div>
        </div>
    )
}

export default Home