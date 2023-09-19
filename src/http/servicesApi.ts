import * as T from './types';
import { AxiosResponse } from 'axios';
import { $serverAuth } from 'http/serverIndex';

export const getServices: T.GetServices = async () => {
    const res: AxiosResponse<ReturnType<typeof getServices>> =
        await $serverAuth.get('account/service-rate-key/');

    return res.data;
};
