'use client';

import React, { useEffect, useRef } from 'react';
import { IRangeInputProps } from 'components/UI/Inputs/types';

import scss from './RangeSlider.module.scss';
import clsx from 'clsx';

export const RangeSlider: React.FC<IRangeInputProps> = ({
    min,
    name,
    value,
    max,
    theme = 'dark',
    onChange,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const progress = (+e.target.value / +max) * 100;
        onChange(e.target.value);
        if (inputRef.current) {
            inputRef.current.style.backgroundImage = `linear-gradient(to right, #31D79B ${progress}%, #ccc ${progress}%)`;
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value > max) {
            let value = +e.target.value;
            while (value > +max) {
                value = value / 10;
            }

            onChange(value.toString());
        }
    };

    useEffect(() => {
        const progress = (+value / +max) * 100;
        if (inputRef.current) {
            inputRef.current.style.backgroundImage = `linear-gradient(to right, #31D79B ${progress}%, #ccc ${progress}%)`;
        }
    }, [value]);

    const titleClass = clsx({
        [scss.input_title]: theme === 'dark',
        [scss.input_title_light]: theme === 'light',
    });

    const inputClass = clsx({
        [scss.input]: theme === 'dark',
        [scss.input_light]: theme === 'light',
    });

    return (
        <div className={scss.range_wrapper}>
            <div className={scss.input_range_wrapper}>
                <p className={scss.min}>{min}</p>
                <div className={scss.input_range_wrapper}>
                    <p className={titleClass}>{name}</p>
                    {min && <p className={scss.min}>{min}</p>}
                    <input
                        ref={inputRef}
                        className={scss.input_range}
                        value={value}
                        min={min}
                        max={max}
                        onChange={handleInputChange}
                        type="range"
                    />
                    {max && <p className={scss.max}>{max}</p>}
                </div>
                <p className={scss.max}>{max}</p>
            </div>
            <div className={scss.input_state_wrapper}>
                <input
                    className={inputClass}
                    value={value}
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};
