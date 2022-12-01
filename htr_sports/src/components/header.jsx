import Paths from "../utils/route";
import LogInSignUp from "./log-in-sign-up";
import SignUp from "./sign-up";

import "./Header.css";
const HeaderItem = ({ name, path }) => {
    return (
        <li> 
            {/* TODO: use link component from react route */}
            <a href={path}>{name}</a>
        </li>
    )
}

const Header = () => {

    return (
        <header>
            <div className="container">
                <nav>
                    <ul className="header-list">
                        {/* {Paths.map(({name, path}) => <HeaderItem key={name} name={name} path={path} />)} */}

                            {/* <img
                            className="logo"
                            src="images/logo_both.png"
                            style={{ width: '15%', height: '15%', display: 'block' }}

                            ></img> */}

                        <HeaderItem name={Paths.home.name} path={Paths.home.path}/>
                        <HeaderItem name={Paths.soccer.name} path={Paths.soccer.path}/>
                        <HeaderItem name={Paths.basketball.name} path={Paths.basketball.path}/>
                        {/* <HeaderItem name={Paths.fantasy.name} path={Paths.fantasy.path}/> */}
                        <HeaderItem name={Paths.worldCup.name} path={Paths.worldCup.path}/>
                        <HeaderItem name={Paths.forum.name} path={Paths.forum.path}/>
                        <HeaderItem name={Paths.findGame.name} path={Paths.findGame.path}/>
                        <SignUp/>
                        <LogInSignUp />

                    </ul>
                </nav>
            </div>
        </header>

    )
};

export default Header;
