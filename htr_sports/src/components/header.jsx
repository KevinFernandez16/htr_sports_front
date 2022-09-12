import Paths from "../utils/route";

const HeaderItem = ({ name, path }) => {
    return (
        <li>
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
                        {Paths.map(({name, path}) => <HeaderItem key={name} name={name} path={path} />)}
                    </ul>
                </nav>
            </div>
        </header>

    )
};

export default Header;