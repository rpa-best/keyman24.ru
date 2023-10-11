import { Form } from 'app/components/Form';
import { getServices } from 'http/servicesApi';

const RegisterPage = async () => {
    const services = await getServices();

    return <Form services={services} />;
};

export default RegisterPage;
