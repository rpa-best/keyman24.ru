import { Introduction } from 'app/components/Introduction';
import { Advantages } from 'app/components/Advantages';
import { FeaturesAndServices } from 'app/components/FeaturesAndServices';
import {
    featureDataOne,
    featureDataThree,
    featureDataTwo,
} from 'app/(Main)/featureData';
import { Modal } from 'components/Modal';
import { Form } from 'app/components/Form';
import Checkpoint from '/public/checkpoint.jpg';
import Inventory from '/public/inventory.jpg';

export default function Home() {
    return (
        <>
            <main>
                <Introduction />
                <Advantages />
                {/*<Subs />*/}
                <FeaturesAndServices
                    contentImg={Checkpoint}
                    features={featureDataOne}
                />
                <FeaturesAndServices
                    contentImg={Inventory}
                    reverse
                    note="* работы подрядчиков в различных помещениях. На основе реальных замеров. "
                    features={featureDataTwo}
                />
                <FeaturesAndServices
                    contentImg={Inventory}
                    features={featureDataThree}
                />
                <Modal>
                    <Form />
                </Modal>
            </main>
        </>
    );
}
