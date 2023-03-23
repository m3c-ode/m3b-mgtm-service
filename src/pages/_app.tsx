import Head from 'next/head';
import Script from 'next/script';
import '../styles/global.css';
import '../styles/global.scss';
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: { Component: any, pageProps: any; }) {
    return (
        <>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    );
}
