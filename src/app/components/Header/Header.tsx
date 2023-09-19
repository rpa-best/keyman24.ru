'use client';

import React from 'react';
import { Variants } from 'framer-motion';

import { Button } from 'components/UI/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import scss from 'app/Main.module.scss';

export const Header = () => {
    const router = useRouter();

    return (
        <header className={scss.header_layout}>
            <div className={scss.header_wrapper}>
                <Link href="/" className={scss.header_title}>
                    Keyman24
                </Link>
                <div className={scss.button_wrapper}>
                    <Button
                        onClick={() => {
                            router.push('/register');
                        }}
                    >
                        Купить подписку
                    </Button>
                </div>
            </div>
        </header>
    );
};
