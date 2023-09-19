import { IService } from 'http/types';

export interface FormProps {
    services: IService[];
}

export interface FormValues {
    inn: string;
    phone: string;
    email: string;
    password: string;
}
