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
    id: number;
    serviceRates: IServiceRate[];
    slug: string;
    name: string;
    desc: string | null;
    image: string;
    price: number;
}

export interface CreateAccBody {
    username: string;
    phone: string;
    password: string;
}

export interface CreateReqBody {
    phone: string;
    service: string;
    desc: string;
}

export type GetServices = () => Promise<IService[]>;

export type CreateAccount = (body: CreateAccBody) => Promise<void>;

export type CreateRequest = (body: CreateReqBody) => Promise<void>;
