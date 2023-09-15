import { Introduction } from 'app/components/Introduction';
import { Advantages } from 'app/components/Advantages';
import { Subs } from 'app/components/Subs';
import { FeaturesAndServices } from 'app/components/FeaturesAndServices';
import { Footer } from 'app/components/Footer';
import { featureData } from 'app/featureData';

import scss from './Main.module.scss';

export default function Home() {
    return (
        <>
            <main>
                <Introduction />
                <Advantages />
                <Subs />
                <FeaturesAndServices features={featureData} />
            </main>
        </>
    );
}
