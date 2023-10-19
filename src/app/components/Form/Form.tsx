'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';

import { FormProps, FormValues } from 'app/components/Form/types';
import RayArrow from '/public/svg/rayArrow.svg';
import { FormValidate, onSubmit } from 'app/components/Form/Form.utils';
import { Input } from 'components/UI/Inputs/Input';
import { Button } from 'components/UI/Button';
import { FormCircles } from 'app/components/Form/FormCircles';
import { useModalStore } from 'store/modalVisibleStore';
import { Modal } from 'components/Modal';
import { ConfirmModal } from 'app/components/Form/ConfirmModal';
import { Spinner } from 'components/Spinner';
import { checkEmail } from 'http/accountApi';
import { AxiosError } from 'axios';
import { isEmpty } from 'utils/isEmpty';

import scss from './Form.module.scss';

export const Form: React.FC<FormProps> = ({ services }) => {
    const [loading, setLoading] = useState(false);
    const [setVisible] = useModalStore((state) => [state.setVisible]);
    const [page, setPage] = useState(1);

    const submit = async (values: FormValues) => {
        setLoading(true);
        onSubmit(values, errors, setPage)
            .then(() => {
                setTimeout(() => setVisible(true), 1500);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const {
        values,
        handleBlur,
        handleChange,
        setTouched,
        validateForm,
        setErrors,
        isValid,
        touched,
        handleSubmit,
        errors,
    } = useFormik<FormValues>({
        initialValues: {
            email: '',
            inn: '',
            password: '',
            phone: '',
            pvc: '',
        },
        onSubmit: submit,
        validate: FormValidate,
    });

    const valid =
        !errors.phone && !errors.inn && !errors.email && !errors.password;

    const handleChangePage = () => {
        validateForm().then((e) => {
            if (valid) {
                checkEmail(values.email)
                    .then(() => {
                        setPage(2);
                    })
                    .catch((e) => {
                        if (e instanceof AxiosError) {
                            if (
                                e.response?.data.email[0].email.slug ===
                                'email_already_exists'
                            ) {
                                setErrors({ email: 'Эта почта уже занята' });
                            }
                        }
                    });
            }
            if (Object.keys(e).length !== 0) {
                setTouched({
                    phone: true,
                    inn: true,
                    email: true,
                    password: true,
                });
                return;
            }
        });
    };

    console.log(errors);

    return (
        <>
            <FormCircles />
            <div className={scss.form_layout}>
                <form className={scss.form} onSubmit={handleSubmit}>
                    {page === 1 && (
                        <>
                            <div className={scss.account}>
                                <div className={scss.title}>
                                    <h3 className={scss.form_sub_header}>
                                        Создание аккаунта
                                    </h3>
                                    <p className={scss.title_pages}>
                                        {page} / 2
                                    </p>
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
                                <Button
                                    onClick={() => handleChangePage()}
                                    type="button"
                                    disabled={!valid}
                                    as="rect"
                                >
                                    Далее
                                </Button>
                            </div>
                        </>
                    )}
                    {page === 2 && (
                        <>
                            <div className={scss.title}>
                                <h3 className={scss.form_sub_header}>
                                    <RayArrow
                                        onClick={() => setPage((p) => p - 1)}
                                        className={scss.form_header_arrow}
                                    />
                                    Подтвердите почту
                                </h3>
                                <p className={scss.title_pages}>{page} / 2</p>
                            </div>
                            <div className={scss.sliders_wrapper}>
                                <Input
                                    label={`Введите код, который мы отправили вам на ${values.email}`}
                                    placeholder="Укажите код"
                                    value={values.pvc}
                                    name="pvc"
                                    autoComplete="off"
                                    handleError={touched.pvc && errors.pvc}
                                    theme="light"
                                    onChange={handleChange}
                                />
                            </div>
                            <Button type="submit">Отправить</Button>
                        </>
                    )}
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
