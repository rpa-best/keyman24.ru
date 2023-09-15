'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

import { Button } from 'components/UI/Button';
import { useModalStore } from 'store/modalVisibleStore';

import scss from 'app/Main.module.scss';

const blockAnimation: Variants = {
    hidden: {
        y: '-20%',
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
};

export const Header = () => {
    const [setVisible] = useModalStore((state) => [state.setVisible]);

    return (
        <motion.header
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blockAnimation}
            className={scss.header_layout}
        >
            <div className={scss.header_wrapper}>
                <h1 className={scss.header_title}>Keyman24</h1>
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
        </motion.header>
    );
};
