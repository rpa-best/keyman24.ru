'use client';
import React from 'react';
import { useFormik } from 'formik';

import { FormProps, FormValues } from 'app/components/Form/types';

import scss from './Form.module.scss';
import { FormValidate } from 'app/components/Form/Form.utils';
import { Input } from 'components/UI/Inputs/Input';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { Button } from 'components/UI/Button';
import { CreateAccBody, CreateReqBody } from 'http/types';
import { createAccount, createRequest } from 'http/accountApi';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useModalStore } from 'store/modalVisibleStore';

export const Form: React.FC<FormProps> = ({ subs, selectedSub }) => {
    const [setVisible] = useModalStore((state) => [state.setVisible]);

    const onSubmit = async (values: FormValues) => {
        const body: CreateAccBody = {
            password: values.password,
            phone: values.phone,
            username: values.login,
        };
        await createAccount(body)
            .then(() => {
                const reqBody: CreateReqBody = {
                    phone: values.phone,
                    desc: values.desc,
                    service: values.sub?.slug as string,
                };

                createRequest(reqBody).then(() => {
                    toast('Успешно!', {
                        position: 'bottom-right',
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'success',
                        theme: 'colored',
                    });
                    setVisible(false);
                });
            })
            .catch((e) => {
                if (e instanceof AxiosError) {
                    if (e.response?.data.password) {
                        errors.password = e.response?.data.password;
                    }
                    if (e.response?.data.username) {
                        if (
                            e.response?.data.username[0][0] ===
                            'user с таким username уже существует.'
                        ) {
                            errors.login = 'Такой пользователь уже существует.';
                        } else {
                            errors.login =
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

    const {
        values,
        handleBlur,
        setFieldValue,
        handleChange,
        setFieldTouched,
        touched,
        handleSubmit,
        isValid,
        errors,
    } = useFormik<FormValues>({
        initialValues: {
            desc: '',
            login: '',
            sub: selectedSub ?? null,
            password: '',
            phone: '',
        },
        enableReinitialize: true,
        onSubmit,
        validate: FormValidate,
    });

    return (
        <div className={scss.form_layout}>
            <h2 className={scss.form_header}>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div className={scss.register}>
                    <h3 className={scss.form_sub_header}>Выбор подписки</h3>
                    <InputSelect
                        label="Подписка"
                        listValues={subs}
                        value={values.sub?.name as string}
                        name="sub"
                        onChange={(v) => setFieldValue('sub', v)}
                        setFieldTouched={setFieldTouched}
                        placeholder="Выберите подписку"
                        autoComplete="off"
                        handleError={touched.sub && errors.sub}
                    />
                    <Input
                        label="Описание"
                        value={values.desc}
                        name="desc"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Добавьте описание для запроса"
                        handleError={touched.desc && errors.desc}
                    />
                </div>
                <div>
                    <h3 className={scss.form_sub_header}>Создание аккаунта</h3>
                    <Input
                        label="Телефон"
                        value={values.phone}
                        name="phone"
                        onChange={handleChange}
                        type="tel"
                        onBlur={handleBlur}
                        placeholder="Укажите ваш телефон"
                        handleError={touched.phone && errors.phone}
                    />
                    <Input
                        label="Логин"
                        value={values.login}
                        name="login"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Укажите логин"
                        handleError={touched.login && errors.login}
                    />
                    <Input
                        label="Пароль"
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        placeholder="Укажите пароль"
                        handleError={touched.password && errors.password}
                    />
                </div>
                <div className={scss.form_button_wrapper}>
                    <Button disabled={!isValid} type="submit" as="rect">
                        Отправить
                    </Button>
                </div>
            </form>
        </div>
    );
};
