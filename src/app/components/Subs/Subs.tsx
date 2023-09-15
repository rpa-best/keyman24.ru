import { getServices } from 'http/servicesApi';
import { SubsWrapper } from 'app/components/Subs/SubsWrapper';
import { IService } from 'http/types';

export const Subs = async () => {
    const services = await getServices();

    return <SubsWrapper subs={services} />;
};
