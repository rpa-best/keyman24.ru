import Input from 'react-input-mask';
import React from 'react';
import clsx from 'clsx';

import { InputMaskProps } from 'components/UI/Inputs/InputMask/InputMask.types';
import scss from 'components/UI/Inputs/Input/Input.module.scss';

export const InputMask = ({
    handleError,
    mask,
    alwaysShowMask,
    placeholder,
    autoFocus,
    value,
    name,
    onChange,
    onBlur,
    label,
    type,
    size = 'medium',
    needErrorLabel = true,
    autoComplete,
    theme = 'dark',
    disabled,
}: InputMaskProps) => {
    const darkTheme = theme === 'dark';

    const fieldClass = clsx({
        [scss.field_noneed]: !needErrorLabel,
        [scss.field]: size === 'medium' && !label,
        [scss.field_big]: size === 'big' && !label,
        [scss.field_with_label_big]: size === 'big' && label,
        [scss.field_with_label]: size === 'medium' && label,
    });

    const labelErrorClass = clsx({
        [scss.input_error_label]: handleError,
        [scss.input_error_label_hidden]: !handleError,
    });

    const labelClass = clsx({
        [scss.input_label]: darkTheme,
        [scss.input_label_light]: !darkTheme,
    });

    const inputClass = clsx({
        [scss.input]: size === 'medium' && darkTheme,
        [scss.input_big]: size === 'big' && darkTheme,
        [scss.input_light]: size === 'medium' && !darkTheme,
        [scss.input_big_light]: size === 'big' && !darkTheme,
        [scss.input_error]: handleError && darkTheme,
        [scss.input_error_light]: handleError && !darkTheme,
    });

    return (
        <div className={fieldClass}>
            {label ? (
                <label className={labelClass}>{label}</label>
            ) : (
                <label className={labelErrorClass}>{handleError}</label>
            )}
            <Input
                disabled={disabled}
                autoComplete={autoComplete}
                type={type}
                className={inputClass}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                value={value}
                alwaysShowMask={alwaysShowMask}
                mask={mask}
                autoFocus={autoFocus}
                id={name}
                name={name}
                placeholder={placeholder}
                onBlur={onBlur}
            />
            {label && <label className={labelErrorClass}>{handleError}</label>}
        </div>
    );
};
