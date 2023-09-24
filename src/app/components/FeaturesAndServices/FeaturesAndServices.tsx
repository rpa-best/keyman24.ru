'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { IFeatureData } from 'app/featureData';
import { SvgWrapper } from 'app/components/FeaturesAndServices/SvgWrapper';
import { ButtonWrapper } from 'app/components/FeaturesAndServices/ButtonWrapper';

import scss from './FeaturesAndServices.module.scss';
import {
    featureBtn,
    featureImg,
    featureSect,
    featureText,
    textElem,
} from 'app/components/FeaturesAndServices/motionConfig';
import clsx from 'clsx';

interface FeaturesAndServicesProps {
    features: IFeatureData;
    reverse?: boolean;
    note?: string;
}

export const FeaturesAndServices: React.FC<FeaturesAndServicesProps> = ({
    features,
    note,
    reverse = false,
}) => {
    const featureClass = clsx({
        [scss.features]: !reverse,
        [scss.features_reverse]: reverse,
    });

    return (
        <motion.section
            variants={featureSect}
            viewport={{ once: true, amount: 0.4 }}
            whileInView="visible"
            initial="hidden"
            className={scss.features_layout}
        >
            <div className={featureClass}>
                <motion.div className={scss.features_description}>
                    <motion.h3
                        variants={featureText}
                        custom={1}
                        className={scss.features_description_title}
                    >
                        {features.title}
                    </motion.h3>
                    <motion.p
                        variants={featureText}
                        custom={1.2}
                        className={scss.features_description_text}
                    >
                        {features.desc}
                    </motion.p>
                    <div className={scss.features_list}>
                        {features.featuresList.map((f, i) => (
                            <motion.div
                                variants={textElem}
                                custom={i + 1}
                                viewport={{ once: true, amount: 0.4 }}
                                key={i}
                                className={scss.features_list_item}
                            >
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
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        viewport={{ once: true, amount: 0.4 }}
                        variants={featureBtn}
                        className={scss.button_wrapper}
                    >
                        <ButtonWrapper />
                    </motion.div>
                    <span className={scss.features_note}>{note}</span>
                </motion.div>
                <motion.div
                    variants={featureImg}
                    className={scss.img_wrapper}
                ></motion.div>
            </div>
        </motion.section>
    );
};
