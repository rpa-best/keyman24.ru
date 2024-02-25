import { removePhoneMask } from 'utils/removePhoneMask';

import { FeedbackFormValues } from 'app/components/FeedbackForm/FeedbackForm.types';

interface FeedbackFormErrors extends Omit<FeedbackFormValues, 'notRobot'> {
    notRobot: string;
}

export const FeedbackFormValidate = (values: FeedbackFormValues) => {
    const errors: Partial<FeedbackFormErrors> = {};

    if (!removePhoneMask(values.phone)) {
        errors.phone = 'Обязательное поле';
    }
    if (!values.name) {
        errors.name = 'Обязательное поле';
    }
    if (!values.message) {
        errors.message = 'Обязательное поле';
    }

    if (!values.notRobot) {
        errors.notRobot = 'Обязательное поле';
    }

    return errors;
};
