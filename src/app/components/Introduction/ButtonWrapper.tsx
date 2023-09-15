'use client';

import React from 'react';
import { useModalStore } from 'store/modalVisibleStore';
import { Button } from 'components/UI/Button';

import scss from 'app/components/Introduction/Introduction.module.scss';

export const ButtonWrapper = () => {
    const [setVisible] = useModalStore((state) => [state.setVisible]);
    return (
        <>
            <Button as="rect" onClick={() => setVisible(true)}>
                Регистрация
            </Button>
            <button className={scss.button_wrapper}>Связь с нами</button>
        </>
    );
};
