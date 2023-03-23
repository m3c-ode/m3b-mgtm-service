import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <script
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_PLACES_API_KEY}&libraries=places,maps`}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}