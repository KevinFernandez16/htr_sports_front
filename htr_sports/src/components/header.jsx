import Paths from "../utils/route";

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
                        <HeaderItem name={Paths.home.name} path={Paths.home.path}/>
                        <HeaderItem name={Paths.soccer.name} path={Paths.soccer.path}/>
                        <HeaderItem name={Paths.basketball.name} path={Paths.basketball.path}/>
                        <HeaderItem name={Paths.fantasy.name} path={Paths.fantasy.path}/>
                        <HeaderItem name={Paths.forum.name} path={Paths.forum.path}/>
                    </ul>
                </nav>
            </div>
        </header>

    )
};

export default Header;