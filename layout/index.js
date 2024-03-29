import React from 'react';
import Head from 'next/head'

import Header from './header';
import Footer from './footer';

import MaterialUIDarkTheme from '../components/providers/materialUIDarkTheme';

const Layout = ({ children, headerSpace, transparentAtTop }) =>
    <MaterialUIDarkTheme >
        <Head>
            <title>風刃</title>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>

        <Header headerSpace={headerSpace} transparentAtTop={transparentAtTop} />

        {children}
        <Footer />
    </MaterialUIDarkTheme>
    ;

export default Layout;