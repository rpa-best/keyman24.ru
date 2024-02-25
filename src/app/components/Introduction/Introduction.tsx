'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { ButtonWrapper } from 'app/components/Introduction/ButtonWrapper';
import { Button } from 'components/UI/Button';
import { introData } from 'app/components/Introduction/introData';
import { Circles } from 'app/components/Introduction/IntroCircles/Circles';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';
import {
    card,
    img,
    mobileCardVariant,
    mobileVariant,
    section,
    tags,
} from 'app/components/Introduction/motionConfig';

import IntroImg from '/public/intro.jpg';

import scss from './Introduction.module.scss';

export const Introduction = () => {
    return (
        <motion.section
            variants={/*isMobile ? mobileVariant : */ section}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={scss.intro_layout}
        >
            <div className={scss.intro_description_wrapper}>
                <Circles />
                <motion.div
                    viewport={{ once: true }}
                    variants={isMobile ? mobileCardVariant : card}
                    className={scss.desc_card_wrapper}
                >
                    <div className={scss.desc_card}>
                        <p className={scss.desc_card_title}>
                            Автоматизированный контроль доступа иностранным
                            работникам на объект
                            <span style={{ color: '#3EB79C' }}>
                                {' '}
                                по документам.*{' '}
                            </span>
                            С быстрым и прозрачным учетом выдачи ключей,
                            инструментов и прочих ТМЦ
                        </p>
                        <p className={scss.desc_card_text}>
                            Получайте исчерпывающую информацию об активности на
                            ваших объектах <br />
                        </p>
                        <span className={scss.desc_card_note}>
                            *может подключаться к существующим СКУД
                        </span>
                        <div className={scss.desc_card_actions}>
                            <ButtonWrapper />
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    viewport={{ once: true }}
                    variants={isMobile ? mobileVariant : img}
                    className={scss.desc_image_wrapper}
                >
                    <Image
                        className={scss.desc_image}
                        sizes={
                            '(max-width: 1920px) 50vw,(max-width: 480px) 100vw'
                        }
                        width={700}
                        height={500}
                        src={IntroImg}
                        alt="Вступительное изображение"
                    />
                </motion.div>
            </div>
            <motion.div
                variants={/*isMobile ? mobileVariant :*/ tags}
                viewport={{ once: true }}
                className={scss.tags_layout}
            >
                <div className={scss.tags}>
                    {introData.map((el, i) => (
                        <div
                            style={{ pointerEvents: 'none' }}
                            key={i}
                            className={scss.tag}
                        >
                            <Button severity="secondary">{el}</Button>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.section>
    );
};
