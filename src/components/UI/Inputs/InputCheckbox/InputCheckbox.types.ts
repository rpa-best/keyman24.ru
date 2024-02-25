export interface InputCheckboxProps {
    name: string;
    label: string;
    value: boolean;
    type: string;
    onChange: (v: boolean) => void;
    handleErrors?: string;
    theme?: 'light' | 'dark';
}
