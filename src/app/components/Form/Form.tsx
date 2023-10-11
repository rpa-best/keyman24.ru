'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { FormProps, FormValues } from 'app/components/Form/types';
import RayArrow from '/public/svg/rayArrow.svg';
import { FormValidate, onSubmit } from 'app/components/Form/Form.utils';
import { Input } from 'components/UI/Inputs/Input';
import { Button } from 'components/UI/Button';
import { RangeSlider } from 'components/UI/Inputs/RangeSlider';
import { useConstructorStore } from 'store/useConstructorStore';
import { FormCircles } from 'app/components/Form/FormCircles';
import { useModalStore } from 'store/modalVisibleStore';
import { Modal } from 'components/Modal';
import { ConfirmModal } from 'app/components/Form/ConfirmModal';
import { Spinner } from 'components/Spinner';
import { useServices } from 'hooks/useServices';
import { usePrice } from 'hooks/usePrice';

import scss from './Form.module.scss';

export const Form: React.FC<FormProps> = ({ services }) => {
    const [loading, setLoading] = useState(false);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [setVisible] = useModalStore((state) => [state.setVisible]);
    const [fields] = useConstructorStore((state) => [state.fields]);
    const [setFields] = useConstructorStore((state) => [state.setFields]);
    const [page, setPage] = useState(1);

    useServices(services, setFields);

    const price = usePrice(fields, 200);

    const submit = async (values: FormValues) => {
        setLoading(true);
        onSubmit(
            values,
            errors,
            fields,
            setPage,
            alreadyRegistered,
            setAlreadyRegistered
        )
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
        touched,
        handleSubmit,
        errors,
    } = useFormik<FormValues>({
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

    const handleChanePage = () => {
        validateForm().then((e) => {
            if (Object.keys(e).length !== 0) {
                setTouched({
                    phone: true,
                    inn: true,
                    email: true,
                    password: true,
                });
                return;
            }
            setPage(2);
        });
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedValues = [...fields];
        updatedValues[index].count = value;
        setFields(updatedValues);
        localStorage.setItem('constructor', JSON.stringify(updatedValues));
    };

    if (fields?.length === 0 || !fields) {
        return <div className={scss.form_layout} />;
    }

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
                                    onClick={() => handleChanePage()}
                                    type="button"
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
                                    Конструктор тарифа
                                </h3>
                                <p className={scss.title_pages}>{page} / 2</p>
                            </div>
                            <div className={scss.sliders_wrapper}>
                                {fields?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={scss.range_wrapper}
                                    >
                                        <RangeSlider
                                            key={index}
                                            name={item.name}
                                            check={item.notLimited}
                                            value={item.count}
                                            min="0"
                                            max={item.max}
                                            subTitle={[
                                                `${item.cost} ₽ / шт`,
                                                `${item.costNotLimited} ₽`,
                                            ]}
                                            theme="light"
                                            fields={fields}
                                            index={item.id.toString()}
                                            setFields={setFields}
                                            onChange={(count) =>
                                                handleInputChange(index, count)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className={scss.form_actions}>
                                <div className={scss.form_button_wrapper}>
                                    <Button
                                        onClick={() => handleChanePage()}
                                        type="submit"
                                        as="rect"
                                    >
                                        Отправить
                                    </Button>
                                </div>
                                <h2 className={scss.price_wrapper}>
                                    <span className={scss.price}>{price}₽</span>{' '}
                                    / за месяц
                                </h2>
                            </div>
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
