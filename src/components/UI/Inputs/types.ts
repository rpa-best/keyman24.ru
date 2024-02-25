import { ChangeEventHandler, CSSProperties, FocusEvent } from 'react';
import { MotionValue } from 'framer-motion';
import { IField } from 'store/useConstructorStore';

export interface IInputProps {
    autoFocus?: boolean;
    value: string;
    name: string;
    handleError?: string | undefined | boolean;
    type?: HTMLInputElement['type'];
    size?: 'big' | 'medium';
    theme?: 'light' | 'dark';
    errorFontColor?: string;
    maxLength?: number;
    onBlur?: (
        event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>
    ) => void;
    onChange:
        | ChangeEventHandler<HTMLInputElement>
        | ChangeEventHandler<HTMLTextAreaElement>;
    placeholder?: string;
    style?: CSSProperties;
    autoComplete?: 'on' | 'off' | 'new-password';
    disabled?: boolean;
    tabIndex?: number;
    label?: string;
    needErrorLabel?: boolean;
}

export interface ListProps {
    list: { id: number; name: string }[];
    handleSetData: (id: number) => void;
    opacity: MotionValue<string>;
}

export interface IInputSelectProps extends Omit<IInputProps, 'onChange'> {
    listValues: { id: number; name: string }[];
    onChange: (item: any) => void;
    setFieldTouched?: (field: string, value: boolean) => void;
}

export interface IRangeInputProps {
    name: string;
    subTitle?: string | string[];
    value: string;
    theme?: 'light' | 'dark';
    check: boolean;
    onChange: (v: string, limited?: boolean) => void;
    min: string;
    max: string;
    fields?: IField[];
    index?: string;
    setFields?: (v: IField[]) => void;
}
