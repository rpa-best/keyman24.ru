import { Introduction } from 'app/components/Introduction';
import { Advantages } from 'app/components/Advantages';
import { Subs } from 'app/components/Subs';
import { FeaturesAndServices } from 'app/components/FeaturesAndServices';
import {
    featureDataOne,
    featureDataThree,
    featureDataTwo,
} from 'app/featureData';
import { Modal } from 'components/Modal';
import { Form } from 'app/components/Form';

export default function Home() {
    return (
        <>
            <main>
                <Introduction />
                <Advantages />
                <Subs />
                <FeaturesAndServices features={featureDataOne} />
                <FeaturesAndServices
                    reverse
                    note="* работы подрядчиков в различных помещениях. На основе реальных замеров. "
                    features={featureDataTwo}
                />
                <FeaturesAndServices features={featureDataThree} />
                <Modal>
                    <Form />
                </Modal>
            </main>
        </>
    );
}
