import React from 'react';
import Head from 'next/head'

import Header from './header';
import Footer from './footer';

const Layout = ({ children }) =>
    <>
        <Head>
            <title>風刃</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        {children}
        <Footer />
    </>
    ;

export default Layout;