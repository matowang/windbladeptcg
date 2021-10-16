import React from 'react';
import Head from 'next/head'

import Header from './header';
import Footer from './footer';

const Layout = ({ children, headerSpace }) =>
    <>
        <Head>
            <title>風刃</title>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>

        <Header headerSpace={headerSpace} />

        {children}
        <Footer />
    </>
    ;

export default Layout;