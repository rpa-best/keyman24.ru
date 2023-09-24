'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useModalStore } from 'store/modalVisibleStore';

import scss from './Modal.module.scss';
import { useResizeWidth } from 'hooks/useResizeWidth';

interface ModalProps {
    children: React.ReactElement;
    preventClickOutside?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    children,
    preventClickOutside,
}) => {
    const { phoneBreak } = useResizeWidth();
    const [visible] = useModalStore((state) => [state.visible]);
    const [setVisible] = useModalStore((state) => [state.setVisible]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() =>
                        preventClickOutside ? '' : setVisible(false)
                    }
                    className={scss.modal_background}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, x: phoneBreak ? '5%' : '15%' }}
                        animate={{
                            opacity: 1,
                            x: phoneBreak ? '-10%' : '-15%',
                        }}
                        exit={{ opacity: 0, x: '15%' }}
                        className={scss.modal}
                    >
                        {/* <ExitSvg
                            onClick={() => setVisible(false)}
                            className={scss.exit_svg}
                        />*/}
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
