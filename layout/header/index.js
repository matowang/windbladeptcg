import Navbar from './navbar';

const Header = ({ headerSpace }) =>
    <>
        <header className="header">
            <Navbar />
        </header>
        {/* header-space is for the fixed header so it doesn't cut off content */}
        {headerSpace && <div id="header-space" />}
    </>

export default Header;

Header.defaultProps = {
    headerSpace: true,
}