import { FormValues } from 'app/components/Form/types';
import { containsLettersAndDigits } from 'utils/validateString';
import { CreateAccBody, CreateReqBody, IService } from 'http/types';
import { authAccount, createAccount, createRequest } from 'http/accountApi';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import CookiesUniversal from 'universal-cookie';
import { IField } from 'store/useConstructorStore';
import { redirect } from 'next/navigation';

const cookie = new CookiesUniversal();

const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/gi;

interface ErrorType extends Partial<Omit<FormValues, 'sub'>> {
    sub?: string;
}

type SubmitType = (
    values: FormValues,
    errors: ErrorType,
    alreadyRegistered: boolean,
    setAlreadyRegistered: (v: boolean) => void
) => Promise<void>;

export const FormValidate = (values: FormValues) => {
    const errors: ErrorType = {};

    if (!values.phone) {
        errors.phone = 'Обязательное поле';
    }

    if (values.email === '') {
        errors.email = 'Обязательное поле';
    } else if (!values?.email?.match(emailCheck)?.length && values.email) {
        errors.email = 'Некорректный email';
    }

    if (!values.password) {
        errors.password = 'Обязательное поле';
    }
    if (values.password.length < 8) {
        errors.password = 'Пароль должен быть минимум 8 символов';
    } else if (!containsLettersAndDigits(values.password)) {
        errors.password = 'Должен содержать и буквы и цифры';
    }

    if (!values.inn) {
        errors.inn = 'Обязательное поле';
    }

    return errors;
};

export const onSubmit: SubmitType = async (
    values,
    errors,
    alreadyRegistered,
    setAlreadyRegistered
) => {
    const reqBody: CreateReqBody = {
        user: values.email,
        org: values.inn,
    };
    const body: CreateAccBody = {
        password: values.password,
        phone: values.phone,
        org: values.inn,
        username: values.email,
    };

    if (alreadyRegistered) {
        await authAccount(body).then((data) => {
            cookie.set('access', data.access);
            createRequest(reqBody)
                .then(() => {
                    toast('Успешно!', {
                        position: 'bottom-right',
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'success',
                        theme: 'colored',
                    });
                })
                .catch((e) => {
                    if (e instanceof AxiosError) {
                        handleError(errors, e.response);
                    }
                });
        });
    } else {
        await createAccount(body)
            .then((data) => {
                setAlreadyRegistered(true);
                cookie.set('access', data.access);
            })
            .catch((e) => {
                if (e instanceof AxiosError) {
                    handleError(errors, e.response);
                }
            });
    }
};

const handleError = (errors: ErrorType, response?: AxiosResponse): void => {
    if (response?.data.password) {
        errors.password = response?.data.password;
    }
    if (response?.data.username) {
        if (
            response?.data.username[0][0] ===
            'user с таким username уже существует.'
        ) {
            errors.email = 'Такой пользователь уже существует.';
        } else {
            errors.email =
                'Только буквы, цифры, нижние подчёркивания или дефисы';
        }
    }
    if (response?.data.phone) {
        if (
            response?.data.phone[0][0] === 'user с таким phone уже существует.'
        ) {
            errors.phone = 'Пользователь с таким телефоном уже существует';
        } else {
            errors.phone = 'Неверный телефон';
        }
    }
    if (response?.data.org[0].org.slug) {
        errors.inn = 'Неверная организация';
    }
};
