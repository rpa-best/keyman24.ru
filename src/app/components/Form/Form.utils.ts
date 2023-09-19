import { FormValues } from 'app/components/Form/types';
import { containsLettersAndDigits } from 'utils/validateString';
import { CreateAccBody, CreateReqBody, IService } from 'http/types';
import { createAccount, createRequest } from 'http/accountApi';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/gi;

interface ErrorType extends Partial<Omit<FormValues, 'sub'>> {
    sub?: string;
}

type SubmitType = (
    values: FormValues,
    errors: ErrorType,
    fields: { name: string; count: string }[],
    setPage: (v: number) => void
) => void;

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

export const onSubmit: SubmitType = async (values, errors, fields, setPage) => {
    const body: CreateAccBody = {
        password: values.password,
        phone: values.phone,
        username: values.email,
    };
    await createAccount(body)
        .then(() => {
            const reqBody: CreateReqBody = {
                user: values.email,
                org: values.inn,
                rates: fields.map((item) => {
                    return {
                        value: +item.count,
                        key: item.name,
                        not_limited: true,
                    };
                }),
            };
            createRequest(reqBody).then(() => {
                toast('Успешно!', {
                    position: 'bottom-right',
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'success',
                    theme: 'colored',
                });
            });
        })
        .catch((e) => {
            setPage(1);
            if (e instanceof AxiosError) {
                if (e.response?.data.password) {
                    errors.password = e.response?.data.password;
                }
                if (e.response?.data.username) {
                    if (
                        e.response?.data.username[0][0] ===
                        'user с таким username уже существует.'
                    ) {
                        errors.email = 'Такой пользователь уже существует.';
                    } else {
                        errors.email =
                            'Только буквы, цифры, нижние подчёркивания или дефисы';
                    }
                }
                if (e.response?.data.phone) {
                    if (
                        e.response?.data.phone[0][0] ===
                        'user с таким phone уже существует.'
                    ) {
                        errors.phone =
                            'Пользователь с таким телефоном уже существует';
                    } else {
                        errors.phone = 'Неверный телефон';
                    }
                }
            }
        });
};
