'use client';
import React, { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';

import { FormProps, FormValues } from 'app/components/Form/types';
import RayArrow from '/public/svg/rayArrow.svg';
import {
    ErrorType,
    FormValidate,
    fullFilled,
    handleError,
    onSubmit,
} from 'app/components/Form/Form.utils';
import { Input } from 'components/UI/Inputs/Input';
import { Button } from 'components/UI/Button';
import { useModalStore } from 'store/modalVisibleStore';

import { Spinner } from 'components/Spinner';
import { checkEmail } from 'http/accountApi';
import { AxiosError } from 'axios';
import { InputMask } from 'components/UI/Inputs/InputMask';
import { PinCodeInput } from 'components/UI/Inputs/PinCodeInput/PinCodeInput';
import { toast } from 'react-toastify';
import { ConfirmModal } from 'app/components/Form/ConfirmModal';

import scss from './Form.module.scss';

export const Form: React.FC<FormProps> = () => {
    const [loading, setLoading] = useState(false);
    const [setVisible] = useModalStore((state) => [state.setVisible]);
    const [page, setPage] = useState(1);

    const submit = async (values: FormValues) => {
        setLoading(true);
        onSubmit(values, errors as any, setPage)
            .then(() => {
                toast(<ConfirmModal />, {
                    autoClose: 10000,
                    theme: 'dark',
                });
                setVisible(false);
            })
            .catch((e) => {
                values.pvc = ['', '', '', '', '', ''];
                if (e instanceof AxiosError) {
                    if (e.response?.data?.pvc) {
                        errors.pvc =
                            e.response?.data?.pvc.flat(Infinity)[0].name;
                        return;
                    } else {
                        setPage(1);
                        handleError(errors as ErrorType, e.response);
                    }
                }
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
        setFieldTouched,
        setFieldValue,
        validateForm,
        setErrors,
        touched,
        handleSubmit,
        submitForm,
        isValid,
        errors,
    } = useFormik<FormValues>({
        initialValues: {
            email: '',
            inn: '',
            password: '',
            phone: '',
            pvc: ['', '', '', '', '', ''],
        },
        onSubmit: submit,
        validate: FormValidate,
    });

    const handleChangePage = () => {
        setLoading(true);
        validateForm()
            .then((e) => {
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
                                    setErrors({
                                        email: 'Эта почта уже занята',
                                    });
                                }
                            }
                        })
                        .finally(() => {
                            setLoading(false);
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
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const valid =
        !errors.inn && !errors.phone && !errors.email && !errors.password;

    useEffect(() => {
        if (isValid) {
            if (fullFilled(values.pvc)) {
                submitForm();
            }
        }
    }, [isValid]);

    return (
        <>
            <form className={scss.form} onSubmit={handleSubmit}>
                {page === 1 && (
                    <>
                        <div className={scss.account}>
                            <div className={scss.title}>
                                <h3 className={scss.form_sub_header}>
                                    Создание аккаунта
                                </h3>
                                <p className={scss.title_pages}>{page} / 2</p>
                            </div>
                            <InputMask
                                theme="light"
                                label="Номер телефона"
                                name="phone"
                                placeholder="+7(___)___-__-__"
                                handleError={errors.phone}
                                value={values.phone}
                                alwaysShowMask={true}
                                mask="+7(999)999-99-99"
                                onBlur={() => setFieldTouched('phone', true)}
                                onChange={(value: string) => {
                                    setFieldTouched('phone', true);
                                    setFieldValue('phone', value);
                                }}
                                type="tel"
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
                            <p className={scss.pin_description}>
                                Введите код, отправленный на{' '}
                                <span>{values.email}</span>
                            </p>
                            <PinCodeInput
                                validateForm={validateForm}
                                errors={errors as FormikErrors<{ pvc: string }>}
                                digits={values.pvc}
                                changeHandler={(v, shouldValidate) =>
                                    setFieldValue('pvc', v, shouldValidate)
                                }
                            />
                        </div>
                    </>
                )}
                {loading && <Spinner />}
            </form>
        </>
    );
};
