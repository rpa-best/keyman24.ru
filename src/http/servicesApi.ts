import * as T from './types';
import { AxiosResponse } from 'axios';
import { $serverAuth } from 'http/serverIndex';
import { $clientAuth } from 'http/clientIndex';

export const getServices: T.GetServices = async () => {
    const res: AxiosResponse<ReturnType<typeof getServices>> =
        await $serverAuth.get('account/service-rate-key/');

    return res.data;
};

export const getPrice: T.GetPrice = async (body) => {
    const res: AxiosResponse<ReturnType<typeof getPrice>> =
        await $clientAuth.post('account/service-rate-calc/', body);

    return res.data;
};
