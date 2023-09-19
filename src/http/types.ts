interface IServiceRateKey {
    id: number;
    modelName: string;
    name: string;
}

interface IServiceRate {
    id: number;
    value: number;
    notLimited: boolean;
    key: IServiceRateKey;
}

export interface IService {
    name: string;
    modelName: string;
}

export interface CreateAccBody {
    username: string;
    phone: string;
    password: string;
}

export interface IRate {
    key: string;
    value: number;
    not_limited: boolean;
}

export interface CreateReqBody {
    user: string;
    org: string;
    rates: IRate[];
}

export type GetServices = () => Promise<IService[]>;

export type CreateAccount = (body: CreateAccBody) => Promise<void>;

export type CreateRequest = (body: CreateReqBody) => Promise<void>;
