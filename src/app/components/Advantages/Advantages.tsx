'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { SvgContainer } from 'app/components/Advantages/SvgContainer';
import { advData } from 'app/components/Advantages/advData';
import { advElement, advSection } from 'app/components/Advantages/motionConfig';

import scss from './Advantages.module.scss';
import { isMobile } from 'react-device-detect';
import { mobileVariant } from 'app/components/Introduction/motionConfig';

export const Advantages = () => {
    return (
        <motion.section
            variants={isMobile ? mobileVariant : advSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className={scss.main_adv_wrapper}
        >
            <div className={scss.main_adv_content}>
                <div className={scss.main_adv_header}>Главные преимущества</div>
                <div className={scss.advs}>
                    {advData.map((el, i) => (
                        <motion.div
                            key={i}
                            viewport={{ once: true }}
                            custom={i}
                            variants={isMobile ? mobileVariant : advElement}
                            className={scss.adv_wrapper}
                        >
                            <SvgContainer elem={el.svg} />
                            <h5>{el.title}</h5>
                            <p>{el.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};
