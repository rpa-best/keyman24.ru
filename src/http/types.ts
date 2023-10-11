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
    cost: number;
    costNotLimited: number;
    name: string;
    modelName: string;
    defaultValue: number;
    maxValue: number;
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

export interface CreateAccountResponse {
    access: string;
    refresh: string;
}

export type GetServices = () => Promise<IService[]>;

export type GetPrice = (
    body: IRate[]
) => Promise<{ body: string[]; cost: number }>;

export type CreateAccount = (
    body: CreateAccBody
) => Promise<CreateAccountResponse>;

export type AuthAccount = CreateAccount;

export type CreateRequest = (body: CreateReqBody) => Promise<void>;
