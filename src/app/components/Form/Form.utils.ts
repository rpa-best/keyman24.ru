import { FormValues } from 'app/components/Form/types';

interface ErrorType extends Partial<Omit<FormValues, 'sub'>> {
    sub?: string;
}

export const FormValidate = (values: FormValues) => {
    const errors: ErrorType = {};

    if (!values.sub?.name) {
        errors.sub = 'Обязательное поле';
    }
    if (!values.phone) {
        errors.phone = 'Обязательное поле';
    }

    if (!values.login) {
        errors.login = 'Обязательное поле';
    }
    if (!values.password) {
        errors.password = 'Обязательное поле';
    }
    if (values.password.length < 8) {
        errors.password = 'Пароль должен быть минимум 8 символов';
    }

    return errors;
};
