import { InputCheckboxProps } from './InputCheckbox.types';

import css from './InputCheckbox.module.scss';
import clsx from 'clsx';

export const InputCheckbox = ({
    name,
    label,
    type,
    value,
    handleErrors,
    onChange,
    theme = 'dark',
}: InputCheckboxProps) => {
    const dark = theme === 'dark';

    const fontClass = clsx({
        [css.input_description]: dark,
        [css.input_description_light]: !dark,
    });

    return (
        <div className={css.input_container}>
            <div className={css.input_wrapper}>
                <label className={fontClass} htmlFor={name}>
                    {label}
                </label>
                <label
                    htmlFor={name}
                    className={
                        value ? css.pseudo_input_active : css.pseudo_input
                    }
                >
                    <input
                        id={name}
                        className={css.input}
                        onChange={() => {
                            onChange(!value);
                        }}
                        name={name}
                        type={type}
                        checked={value}
                    />
                </label>
            </div>
            {handleErrors && (
                <label className={css.checkbox_error}>{handleErrors}</label>
            )}
        </div>
    );
};
