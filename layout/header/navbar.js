const Navbar = () => (
    <nav className="navbar">
        <ul className="navbar__list">
            <li className="navbar__item">
                <a className="navbar__link" href='/'>鋒刃</a>
            </li>
            <li className="navbar__item" >
                <a className="navbar__link" href='/cards'>卡片專區</a>
            </li>
            <li className="navbar__item" >
                <a className="navbar__link" href='/cards'>創造甲板</a>
            </li>
        </ul>
    </nav>
)

export default Navbar;