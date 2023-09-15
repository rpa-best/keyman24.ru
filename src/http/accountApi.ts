import * as T from 'http/types';
import { $clientAuth } from 'http/clientIndex';

export const createAccount: T.CreateAccount = async (body) => {
    await $clientAuth.post('account/create/', body);
};

export const createRequest: T.CreateRequest = async (body) => {
    await $clientAuth.post('account/request-subscription/', body);
};
