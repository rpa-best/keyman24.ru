import React from 'react';

import scss from 'app/Main.module.scss';

export const Footer = () => {
    return (
        <footer className={scss.footer_layout}>
            <div className={scss.footer_wrapper}>
                <h1 className={scss.footer_title}>Keyman24</h1>
                <p className={scss.footer_span}>© 2023 Company</p>
            </div>
        </footer>
    );
};
