'use client';

import React, { useState } from 'react';

import { useModalStore } from 'store/modalVisibleStore';
import { FeedbackForm } from 'app/components/FeedbackForm';
import { Modal } from 'components/Modal';
import { Button } from 'components/UI/Button';

import scss from 'app/components/Introduction/Introduction.module.scss';

export const ButtonWrapper = () => {
    const [customVisible, setCustomVisible] = useState(false);
    const [setVisible] = useModalStore((state) => [state.setVisible]);

    return (
        <>
            <Button
                as="rect"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Регистрация
            </Button>
            <button
                onClick={() => setCustomVisible(true)}
                className={scss.button_wrapper}
            >
                Связь с нами
            </button>
            <Modal
                setCustomVisible={setCustomVisible}
                customVisible={customVisible}
            >
                <FeedbackForm setVisible={setCustomVisible} />
            </Modal>
        </>
    );
};
