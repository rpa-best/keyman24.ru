'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { IFeatureData } from 'app/(Main)/featureData';
import Image, { StaticImageData } from 'next/image';
import { SvgWrapper } from 'app/components/FeaturesAndServices/SvgWrapper';
import { ButtonWrapper } from 'app/components/FeaturesAndServices/ButtonWrapper';
import {
    featureBtn,
    featureImg,
    featureSect,
    featureText,
    textElem,
} from 'app/components/FeaturesAndServices/motionConfig';

import scss from './FeaturesAndServices.module.scss';
import { isMobile } from 'react-device-detect';
import { mobileVariant } from 'app/components/Introduction/motionConfig';

interface FeaturesAndServicesProps {
    features: IFeatureData;
    reverse?: boolean;
    note?: string;
    contentImg: StaticImageData;
}

export const FeaturesAndServices: React.FC<FeaturesAndServicesProps> = ({
    features,
    note,
    reverse = false,
    contentImg,
}) => {
    const featureClass = clsx({
        [scss.features]: !reverse,
        [scss.features_reverse]: reverse,
    });

    return (
        <motion.section
            variants={/*isMobile ? mobileVariant :*/ featureSect}
            viewport={{ once: true, amount: 0.4 }}
            whileInView="visible"
            initial="hidden"
            className={scss.features_layout}
        >
            <div className={featureClass}>
                <motion.div className={scss.features_description}>
                    <motion.h3
                        variants={/*isMobile ? mobileVariant :*/ featureText}
                        custom={1}
                        className={scss.features_description_title}
                    >
                        {features.title}
                    </motion.h3>
                    <motion.p
                        variants={/*isMobile ? mobileVariant :*/ featureText}
                        custom={1.2}
                        className={scss.features_description_text}
                    >
                        {features.desc}
                    </motion.p>
                    <div className={scss.features_list}>
                        {features.featuresList.map((f, i) => (
                            <motion.div
                                variants={
                                    /*isMobile ? mobileVariant :*/ textElem
                                }
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
                        variants={/*isMobile ? mobileVariant :*/ featureBtn}
                        className={scss.button_wrapper}
                    >
                        <ButtonWrapper />
                    </motion.div>
                    <span className={scss.features_note}>{note}</span>
                </motion.div>
                <motion.div
                    variants={/*isMobile ? mobileVariant :*/ featureImg}
                    className={scss.img_wrapper}
                >
                    <Image
                        sizes={
                            '(max-width: 1920px) 50vw,(max-width: 480px) 100vw'
                        }
                        src={contentImg}
                        alt="feature image"
                        width={1000}
                        height={700}
                        className={scss.img}
                    />
                </motion.div>
            </div>
        </motion.section>
    );
};
