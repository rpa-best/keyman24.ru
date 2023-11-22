import { IService } from 'http/types';

export interface FormProps {}

export interface FormValues {
    inn: string;
    phone: string;
    email: string;
    password: string;
    pvc: string[];
}
