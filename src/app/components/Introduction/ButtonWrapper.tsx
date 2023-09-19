'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'components/UI/Button';

import scss from 'app/components/Introduction/Introduction.module.scss';

export const ButtonWrapper = () => {
    const router = useRouter();
    return (
        <>
            <Button as="rect" onClick={() => router.push('/register')}>
                Регистрация
            </Button>
            <button className={scss.button_wrapper}>Связь с нами</button>
        </>
    );
};
