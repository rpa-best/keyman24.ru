import type { Metadata } from 'next';
import React from 'react';
import { montserrat } from 'font/montserrat';

import 'react-toastify/dist/ReactToastify.css';
import 'scss/utils.scss';
import 'scss/_reset.scss';

export const metadata: Metadata = {
    title: 'Public Keyman',
    description: 'Public Keyman',
    verification: {
        google: 'ppUSrN1XzX0Rrk0IDfWXWVE7Au6HPkhAAaYV4S1ca5k',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
                className={montserrat.className}
            >
                {children}
            </body>
        </html>
    );
}
