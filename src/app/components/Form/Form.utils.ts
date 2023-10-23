import { FormValues } from 'app/components/Form/types';
import { containsLettersAndDigits } from 'utils/validateString';
import { CreateAccBody, CreateReqBody } from 'http/types';
import { createAccount, createRequest } from 'http/accountApi';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import CookiesUniversal from 'universal-cookie';

const cookie = new CookiesUniversal();

const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/gi;

interface ErrorType extends Partial<Omit<FormValues, 'sub'>> {
    sub?: string;
}

type SubmitType = (
    values: FormValues,
    errors: ErrorType,
    setPage: (v: number) => void
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

    if (!values.pvc) {
        errors.pvc = 'Обязательное поле';
    } else if (values.pvc.length !== 6) {
        errors.pvc = 'Длина кода 6 символов';
    }

    if (!values.inn) {
        errors.inn = 'Обязательное поле';
    }

    return errors;
};

export const onSubmit: SubmitType = async (values, errors, setPage) => {
    const body: CreateAccBody = {
        password: values.password,
        phone: values.phone,
        username: values.email,
        org: values.inn,
        pvc: values.pvc,
    };

    await createAccount(body)
        .then((data) => {
            cookie.set('access', data.access);
        })
        .catch((e) => {
            setPage(1);
            if (e instanceof AxiosError) {
                handleError(errors, values, e.response);
            }
            throw e;
        });
};

const handleError = (
    errors: ErrorType,
    values: FormValues,
    response?: AxiosResponse
): void => {
    if (response?.data.password) {
        errors.password = response?.data.password;
        values.pvc = '';
    }
    if (response?.data.username) {
        if (
            response?.data.username[0][0] ===
            'user с таким username уже существует.'
        ) {
            values.pvc = '';
            errors.email = 'Такой пользователь уже существует.';
        } else {
            errors.email =
                'Только буквы, цифры, нижние подчёркивания или дефисы';
            values.pvc = '';
        }
    }
    if (response?.data.phone) {
        if (
            response?.data.phone[0][0] === 'user с таким phone уже существует.'
        ) {
            errors.phone = 'Пользователь с таким телефоном уже существует';
            values.pvc = '';
        } else {
            errors.phone = 'Неверный телефон';
            values.pvc = '';
        }
    }
    if (response?.data?.message) {
        if (response?.data?.message[0][0] === 'К') {
            errors.inn = 'Неверная организация';
            values.pvc = '';
        }
    }

    if (response?.data.org[0].slug === 'org_already_has_subs') {
        errors.inn = 'Эта организация уже занята';
        values.pvc = '';
    }
};
