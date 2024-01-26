import React from 'react';

import scss from 'app/(Main)/Main.module.scss';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className={scss.footer_layout}>
            <div className={scss.footer_wrapper}>
                <h1 className={scss.footer_title}>Keyman24</h1>
                <ul className={scss.links}>
                    <li>
                        <Link href="/legal/oferta_business" target="_blank">
                            Оферта
                        </Link>
                    </li>
                    <li>
                        <p className={scss.footer_span}>© 2023 Company</p>
                    </li>
                </ul>
            </div>
        </footer>
    );
};
