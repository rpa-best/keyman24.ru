'use client';

import React from 'react';
import { Variants } from 'framer-motion';

import { Button } from 'components/UI/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import scss from 'app/(Main)/Main.module.scss';
import { useModalStore } from 'store/modalVisibleStore';

export const Header = () => {
    const [setVisible] = useModalStore((state) => [state.setVisible]);

    return (
        <header className={scss.header_layout}>
            <div className={scss.header_wrapper}>
                <Link href="/" className={scss.header_title}>
                    Keyman24
                </Link>
                <div className={scss.button_wrapper}>
                    <Button
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        Купить подписку
                    </Button>
                </div>
            </div>
        </header>
    );
};
