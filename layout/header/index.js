import Navbar from './navbar';

const Header = () =>
    <>
        <header className="header">
            <a id="logo-link" href="/">
                <img className="logo" src="/logo.png" alt="logo" />
            </a>
            <Navbar />
        </header>
        {/* header-space is for the fixed header so it doesn't cut off content */}
        <div id="header-space" />
    </>

export default Header; 