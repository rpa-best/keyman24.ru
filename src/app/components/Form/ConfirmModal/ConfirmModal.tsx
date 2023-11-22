'use client';

import React from 'react';

import scss from './ConfirmModal.module.scss';

export const ConfirmModal = () => {
    //  window.location.href = `https://business.keyman24.ru/login`;

    return (
        <div className={scss.modal}>
            <h3 className={scss.modal_text}>Перенаправить вас на сайт?</h3>
            <div className={scss.buttons_wrapper}>
                <button
                    onClick={() => {
                        window.location.href = `https://business.keyman24.ru/login`;
                    }}
                    className={scss.yes_button}
                >
                    Да
                </button>
                <button className={scss.no_button}>Нет</button>
            </div>
        </div>
    );
};
