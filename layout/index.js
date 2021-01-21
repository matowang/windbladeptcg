import React from 'react';
import Head from 'next/head'

import Header from './header';
import Footer from './footer';

const Layout = ({ children, headerSpace }) =>
    <>
        <Head>
            <title>風刃</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>

        <Header headerSpace={headerSpace} />

        {children}
        <Footer />
    </>
    ;

export default Layout;