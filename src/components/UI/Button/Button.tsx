import React from 'react';
import clsx from 'clsx';

import scss from './Buttom.module.scss';

interface ButtonProps {
    children: string;
    onClick?: () => void;
    severity?: 'default' | 'secondary';
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
    as?: 'rounded' | 'rect';
}

export const Button: React.FC<ButtonProps> = ({
    severity = 'default',
    children,
    onClick,
    as = 'rounded',
    type,
    disabled,
}) => {
    const defaultStyle = severity === 'default';
    const rounded = as === 'rounded';

    const buttonClass = clsx({
        [scss.button]: defaultStyle && rounded,
        [scss.button_secondary]: !defaultStyle && rounded,
        [scss.button_rect]: defaultStyle && !rounded,
        [scss.button_rect_secondary]: !defaultStyle && !rounded,
    });

    return (
        <button
            type={type}
            style={{ pointerEvents: disabled ? 'none' : 'auto' }}
            className={buttonClass}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
