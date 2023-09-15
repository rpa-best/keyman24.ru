import React from 'react';

import { IFeatureData } from 'app/featureData';
import { SvgWrapper } from 'app/components/FeaturesAndServices/SvgWrapper';

import scss from './FeaturesAndServices.module.scss';
import { Button } from 'components/UI/Button';
import { ButtonWrapper } from 'app/components/FeaturesAndServices/ButtonWrapper';

interface FeaturesAndServicesProps {
    features: IFeatureData;
}

export const FeaturesAndServices: React.FC<FeaturesAndServicesProps> = ({
    features,
}) => {
    return (
        <section className={scss.features_layout}>
            <div className={scss.features}>
                <div className={scss.features_description}>
                    <h3 className={scss.features_description_title}>
                        {features.title}
                    </h3>
                    <p className={scss.features_description_text}>
                        {features.desc}
                    </p>
                    <div className={scss.features_list}>
                        {features.featuresList.map((f, i) => (
                            <div key={i} className={scss.features_list_item}>
                                <div
                                    className={
                                        i === 0
                                            ? scss.active_svg
                                            : scss.done_svg_wrapper
                                    }
                                >
                                    <SvgWrapper />
                                </div>
                                <p>{f}</p>
                            </div>
                        ))}
                    </div>
                    <div className={scss.button_wrapper}>
                        <ButtonWrapper />
                    </div>
                </div>
                <div className={scss.img_wrapper}></div>
            </div>
        </section>
    );
};
