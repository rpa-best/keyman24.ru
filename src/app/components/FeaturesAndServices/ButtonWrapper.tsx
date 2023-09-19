'use client';

import { Button } from 'components/UI/Button';
import { useRouter } from 'next/navigation';

export const ButtonWrapper = () => {
    const router = useRouter();

    return (
        <Button as="rect" onClick={() => router.push('/register')}>
            Регистрация
        </Button>
    );
};
