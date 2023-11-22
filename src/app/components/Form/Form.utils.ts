import { FormValues } from 'app/components/Form/types';
import { containsLettersAndDigits } from 'utils/validateString';
import { CreateAccBody, CreateReqBody } from 'http/types';
import { createAccount, createRequest } from 'http/accountApi';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import CookiesUniversal from 'universal-cookie';
import { isEmpty } from 'utils/isEmpty';

const cookie = new CookiesUniversal();

const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/gi;

export interface ErrorType extends Partial<Omit<FormValues, 'sub' | 'pvc'>> {
    sub?: string;
    pvc?: string;
}

type SubmitType = (
    values: FormValues,
    errors: ErrorType,
    setPage: (v: number) => void
) => Promise<void>;

export function fullFilled(str: string[]) {
    return str.every((el) => /\d/g.test(el));
}

export const FormValidate = (values: FormValues) => {
    const errors: ErrorType = {};

    if (!values.phone) {
        errors.phone = 'Обязательное поле';
    }

    if (isEmpty(values.pvc)) {
        errors.pvc = 'Укажите код';
    } else if (!fullFilled(values.pvc)) {
        errors.pvc = 'Не полный код';
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
        pvc: values.pvc.join(''),
    };

    await createAccount(body).then((data) => {
        cookie.set('access', data.access);
    });
    /*.catch((e) => {
            if (e instanceof AxiosError) {
                handleError(errors, values, e.response);
            }
            throw e;
        });*/
};

export const handleError = (
    errors: ErrorType,
    response?: AxiosResponse
): void => {
    if (response?.data.password) {
        errors.password = response?.data.password.flat(Infinity)[0];
    }
    if (response?.data.username) {
        errors.email = response?.data?.username.flat(Infinity)[0].name;
    }
    if (response?.data.phone) {
        errors.phone = response?.data?.phone.flat(Infinity)[0]?.phone.name;
    }
    if (response?.data?.message) {
        errors.inn = response?.data?.message.flat(Infinity)[0];
    }
    if (response?.data?.org) {
        errors.inn = response?.data?.org.flat(Infinity)[0].name;
    }
};
