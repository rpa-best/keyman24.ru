'use client';

import { Button } from 'components/UI/Button';
import { useModalStore } from 'store/modalVisibleStore';

export const ButtonWrapper = () => {
    const [setVisible] = useModalStore((state) => [state.setVisible]);

    return (
        <Button as="rect" onClick={() => setVisible(true)}>
            Регистрация
        </Button>
    );
};
