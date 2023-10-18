'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';

import { FormProps, FormValues } from 'app/components/Form/types';
import { FormValidate, onSubmit } from 'app/components/Form/Form.utils';
import { Input } from 'components/UI/Inputs/Input';
import { Button } from 'components/UI/Button';
import { FormCircles } from 'app/components/Form/FormCircles';
import { useModalStore } from 'store/modalVisibleStore';
import { Modal } from 'components/Modal';
import { ConfirmModal } from 'app/components/Form/ConfirmModal';
import { Spinner } from 'components/Spinner';

import scss from './Form.module.scss';

export const Form: React.FC<FormProps> = ({ services }) => {
    const [loading, setLoading] = useState(false);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [setVisible] = useModalStore((state) => [state.setVisible]);

    const submit = async (values: FormValues) => {
        setLoading(true);
        onSubmit(values, errors, alreadyRegistered, setAlreadyRegistered)
            .then(() => {
                setTimeout(() => setVisible(true), 1500);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const { values, handleBlur, handleChange, touched, handleSubmit, errors } =
        useFormik<FormValues>({
            initialValues: {
                email: '',
                inn: '',
                password: '',
                phone: '',
            },
            enableReinitialize: true,
            onSubmit: submit,
            validate: FormValidate,
        });

    return (
        <>
            <FormCircles />
            <div className={scss.form_layout}>
                <form className={scss.form} onSubmit={handleSubmit}>
                    <>
                        <div className={scss.account}>
                            <div className={scss.title}>
                                <h3 className={scss.form_sub_header}>
                                    Создание аккаунта
                                </h3>
                            </div>
                            <Input
                                theme="light"
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
                                theme="light"
                                label="Почта"
                                value={values.email}
                                name="email"
                                autoComplete="new-password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Укажите почту"
                                handleError={touched.email && errors.email}
                            />
                            <Input
                                theme="light"
                                label="Пароль"
                                autoComplete="new-password"
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="password"
                                placeholder="Укажите пароль"
                                handleError={
                                    touched.password && errors.password
                                }
                            />
                        </div>
                        <div className={scss.register}>
                            <h3 className={scss.form_sub_header}>
                                Организация
                            </h3>
                            <Input
                                theme="light"
                                label="ИНН организации"
                                value={values.inn}
                                name="inn"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Укажите ИНН организации"
                                handleError={touched.inn && errors.inn}
                            />
                        </div>
                        <div className={scss.form_button_wrapper}>
                            <Button type="submit" as="rect">
                                Отправить
                            </Button>
                        </div>
                    </>
                </form>
                <div className={scss.image}></div>
            </div>
            {loading && <Spinner />}
            <Modal preventClickOutside>
                <ConfirmModal delay={7} />
            </Modal>
        </>
    );
};
