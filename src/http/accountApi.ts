import * as T from 'http/types';
import { $clientAuth } from 'http/clientIndex';

import CookiesUniversal from 'universal-cookie';

const cookie = new CookiesUniversal();

export const createAccount: T.CreateAccount = async (body) => {
    const res = await $clientAuth.post(
        'account/create/?login_params=username_password',
        body
    );

    $clientAuth.interceptors.request.use((req) => {
        req.headers.set('Authorization', `Bearer ${res.data.access}`);

        return req;
    });

    return res.data;
};

export const checkEmail = async (email: string) => {
    const res = await $clientAuth.post('account/check-email/?place=register', {
        email,
    });

    return res.data;
};

export const authAccount: T.AuthAccount = async (body) => {
    const res = await $clientAuth.post(
        'account/auth/?login_params=username_password',
        body
    );

    $clientAuth.interceptors.request.use((req) => {
        req.headers.set('Authorization', `Bearer ${res.data.access}`);

        return req;
    });

    return res.data;
};

export const createRequest: T.CreateRequest = async (body) => {
    const access = cookie.get('access');

    await $clientAuth.post('account/service-request/', body, {
        headers: {
            Authorization: `Bearer ${access}`,
        },
    });
};

export const sendMessage: T.SendMessage = async (body) => {
    return await $clientAuth.post('account/report/', body);
};
