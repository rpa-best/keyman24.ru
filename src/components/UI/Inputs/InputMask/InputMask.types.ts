import { IInputProps } from 'components/UI/Inputs/types';

export interface InputMaskProps
    extends Pick<
        IInputProps,
        | 'value'
        | 'name'
        | 'autoFocus'
        | 'onBlur'
        | 'type'
        | 'handleError'
        | 'size'
        | 'needErrorLabel'
    > {
    onChange: (value: string) => void;
    theme?: 'dark' | 'light';
    alwaysShowMask: boolean | undefined;
    mask: string;
    placeholder: string;
    label: string;
    autoComplete?: string;
    disabled?: boolean;
}
