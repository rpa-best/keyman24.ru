import React, { FC, useState } from 'react';
import { useFormik } from 'formik';

import { InputMask } from 'components/UI/Inputs/InputMask';
import { Input } from 'components/UI/Inputs/Input';
import { Button } from 'components/UI/Button';
import { InputCheckbox } from 'components/UI/Inputs/InputCheckbox';
import { Spinner } from 'components/Spinner';

import { FeedbackFormValidate } from 'app/components/FeedbackForm/FeedbackForm.utils';

import {
    FeedbackFormProps,
    FeedbackFormValues,
} from 'app/components/FeedbackForm/FeedbackForm.types';

import scss from './FeedbackForm.module.scss';
import { SendMessageBody } from 'http/types';
import { sendMessage } from 'http/accountApi';
import { toast } from 'react-toastify';

export const FeedbackForm: FC<FeedbackFormProps> = ({ setVisible }) => {
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: FeedbackFormValues) => {
        setLoading(true);
        const body: SendMessageBody = {
            name: values.name,
            message: values.message,
            phone: values.phone,
        };
        try {
            await sendMessage(body);
            toast('Успешно!', {
                type: 'success',
                theme: 'colored',
                autoClose: 2000,
            });
            setVisible(false);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const {
        values,
        handleBlur,
        handleChange,
        setFieldTouched,
        setFieldValue,
        touched,
        handleSubmit,
        isValid,
        errors,
    } = useFormik<FeedbackFormValues>({
        initialValues: {
            name: '',
            phone: '',
            message: '',
            notRobot: false,
        },
        onSubmit,
        validate: FeedbackFormValidate,
    });

    return (
        <>
            <form className={scss.form} onSubmit={handleSubmit}>
                <div className={scss.account}>
                    <div className={scss.title}>
                        <h3 className={scss.form_sub_header}>Обратная связь</h3>
                    </div>
                    <InputMask
                        theme="light"
                        label="Номер телефона"
                        name="phone"
                        placeholder="+7(___)___-__-__"
                        handleError={touched.phone && errors.phone}
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
                        label="Ваше имя"
                        value={values.name}
                        name="name"
                        autoComplete="new-password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Укажите ваше имя"
                        handleError={touched.name && errors.name}
                    />
                    <Input
                        maxLength={500}
                        theme="light"
                        label="Сообщение"
                        autoComplete="new-password"
                        value={values.message}
                        name="message"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="textarea"
                        placeholder="Что вы хотите спросить?"
                        handleError={touched.message && errors.message}
                    />
                </div>
                <InputCheckbox
                    handleErrors={touched.notRobot && (errors.notRobot as any)}
                    name="notRobot"
                    label="Подтвердите, что вы не робот"
                    value={values.notRobot}
                    type="checkbox"
                    onChange={() => setFieldValue('notRobot', !values.notRobot)}
                />
                <div className={scss.form_button_wrapper}>
                    <Button type="submit" disabled={!isValid} as="rect">
                        Отправить!
                    </Button>
                </div>
            </form>
            {loading && <Spinner />}
        </>
    );
};
