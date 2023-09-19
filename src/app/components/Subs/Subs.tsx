import { getServices } from 'http/servicesApi';
import { SubsWrapper } from 'app/components/Subs/SubsWrapper';

export const Subs = async () => {
    const services = await getServices();

    return <SubsWrapper services={services} />;
};
