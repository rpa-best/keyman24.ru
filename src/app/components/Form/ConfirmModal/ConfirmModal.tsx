'use client';

import React, { useEffect, useRef, useState } from 'react';

import scss from './ConfirmModal.module.scss';
import { useModalStore } from 'store/modalVisibleStore';

interface ConfirmModal {
    delay: number;
}

export const ConfirmModal: React.FC<ConfirmModal> = ({ delay }) => {
    const [setVisible] = useModalStore((state) => [state.setVisible]);
    const stepWidth = 100 / (delay * 100);
    const [progress, setProgress] = useState(98);
    const intervalId = useRef<any>();

    useEffect(() => {
        intervalId.current = setInterval(() => {
            if (progress > 0) {
                setProgress((prevProgress) => prevProgress - stepWidth);
            } else {
                setVisible(false);
                window.location.href = `https://business.keyman24.ru/login`;
            }
        }, 10);

        return () => {
            clearInterval(intervalId.current);
        };
    }, [progress, stepWidth]);

    return (
        <div className={scss.modal}>
            <h3 className={scss.modal_text}>Перенаправить вас на сайт?</h3>
            <div className={scss.buttons_wrapper}>
                <button
                    onClick={() => {
                        setVisible(false);
                        window.location.href = `https://business.keyman24.ru/login`;
                    }}
                    className={scss.yes_button}
                >
                    Да
                </button>
                <button
                    onClick={() => {
                        setVisible(false);
                        clearInterval(intervalId.current);
                    }}
                    className={scss.no_button}
                >
                    Нет
                </button>
            </div>
            <span
                style={{ width: `${progress <= 0 ? 0 : progress}%` }}
                className={scss.modal_line}
            />
        </div>
    );
};
