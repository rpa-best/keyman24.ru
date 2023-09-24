import { useEffect } from 'react';
import { IField } from 'store/useConstructorStore';
import { IService } from 'http/types';

type UseServicesType = (
    services: IService[],
    setFields: (v: IField[]) => void
) => void;

export const useServices: UseServicesType = (services, setFields) => {
    useEffect(() => {
        const data = localStorage.getItem('constructor');
        const parsedConstructor = JSON.parse(data as string);
        if (parsedConstructor?.length && parsedConstructor?.length !== 0) {
            setFields(parsedConstructor);
        } else {
            setFields(
                services.map((item, index) => ({
                    id: index,
                    name: item.name,
                    count: item.defaultValue.toString(),
                    max: item.maxValue.toString(),
                    slug: item.modelName,
                    notLimited: false,
                }))
            );
        }
    }, [services, setFields]);
};
