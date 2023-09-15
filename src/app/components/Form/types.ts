import { IService } from 'http/types';

export interface FormProps {
    subs: IService[];
    selectedSub?: IService;
}

export interface FormValues {
    sub: IService | null;
    desc: string;
    phone: string;
    login: string;
    password: string;
}
