const Navbar = () => (
    <nav className="navbar">
        <ul className="navbar__list">
            <li className="navbar__item" >
                <a className="navbar__link" href='/cards'>卡片專區Cards</a>
            </li>
            <li className="navbar__item">
                <a className="navbar__link" id="logo-link" href="/">
                    <img className="logo" src="/katana-wind-logo-light-sword-no-bg.svg" alt="logo" />
                </a>
            </li>
            <li className="navbar__item" >
                <a className="navbar__link" href='/deckbuilder'>牌組合成器</a>
            </li>
        </ul>
    </nav>
)

export default Navbar;