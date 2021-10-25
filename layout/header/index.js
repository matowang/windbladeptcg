import Navbar from './navbar';

import React, { useState, useEffect } from 'react';

const Header = ({ headerSpace, transparentAtTop }) => {
    const [transparentBG, setTransparentBG] = useState(transparentAtTop);
    const handleScroll = () => {
        setTransparentBG(transparentAtTop && window.pageYOffset < window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <header className={`header${transparentBG ? " header--tranparent-at-top" : ""}`}>
                <Navbar />
            </header>
            {/* header-space is for the fixed header so it doesn't cut off content */}
            {headerSpace && <div id="header-space" />}
        </>
    )
}
export default Header;

Header.defaultProps = {
    headerSpace: true,
}