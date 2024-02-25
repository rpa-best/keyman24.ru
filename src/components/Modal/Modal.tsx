'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';

import ExitSvg from '/public/svg/x.svg';
import { useModalStore } from 'store/modalVisibleStore';

import scss from './Modal.module.scss';

interface ModalProps {
    customVisible?: boolean;
    setCustomVisible?: (v: boolean) => void;
    children: React.ReactElement;
}

export const Modal: React.FC<ModalProps> = ({
    customVisible,
    setCustomVisible,
    children,
}) => {
    const [visible] = useModalStore((state) => [state.visible]);
    const [setVisible] = useModalStore((state) => [state.setVisible]);

    const isVisible = visible || customVisible;

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflowX = 'hidden';
        } else {
            document.body.style.overflowX = 'auto';
        }
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: isMobile ? 0 : 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                        if (setCustomVisible) {
                            setCustomVisible(false);
                        }
                        setVisible(false);
                        toast.dismiss();
                    }}
                    className={scss.modal_background}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{
                            opacity: 0,
                            transform: 'translateY(50px)',
                        }}
                        animate={{ opacity: 1, transform: 'translateY(0)' }}
                        exit={{
                            opacity: 0,
                            transform: 'translateY(50px)',
                        }}
                        className={scss.modal}
                    >
                        <ExitSvg
                            onClick={() => {
                                if (setCustomVisible) {
                                    setCustomVisible(false);
                                }
                                setVisible(false);
                                toast.dismiss();
                            }}
                            className={scss.exit_svg}
                        />
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
