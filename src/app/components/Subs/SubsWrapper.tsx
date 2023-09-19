'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import { IService } from 'http/types';
import { Circles } from 'app/components/Subs/SubsCircles/Circles';

import scss from './Subs.module.scss';
import { element, section } from 'app/components/Subs/motionConfig';
import { RangeSlider } from 'components/UI/Inputs/RangeSlider';
import { useConstructorStore } from 'store/useConstructorStore';
import { useRouter } from 'next/navigation';

interface SubsWrapperProps {
    services: IService[];
}

export const SubsWrapper: React.FC<SubsWrapperProps> = ({ services }) => {
    const [fields] = useConstructorStore((state) => [state.fields]);
    const [setFields] = useConstructorStore((state) => [state.setFields]);

    const router = useRouter();

    useEffect(() => {
        setFields(services.map((item) => ({ name: item.name, count: '0' })));
    }, [services, setFields]);

    const handleInputChange = (index: number, value: string) => {
        const updatedValues = [...fields];
        updatedValues[index].count = value;
        setFields(updatedValues);
    };

    return (
        <motion.section
            variants={section}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.2 }}
            className={scss.subs_layout}
        >
            <div className={scss.subs_header}>Конструктор тарифа</div>
            <Circles />
            <motion.div className={scss.service_constructor}>
                {fields.map((item, index) => (
                    <motion.div
                        custom={2 + index}
                        variants={element}
                        key={index}
                        className={scss.range_wrapper}
                    >
                        <RangeSlider
                            key={index}
                            name={item.name}
                            value={item.count}
                            min="0"
                            max="1000"
                            onChange={(count) =>
                                handleInputChange(index, count)
                            }
                        />
                    </motion.div>
                ))}
                <motion.div
                    variants={element}
                    custom={fields.length + 2}
                    className={scss.button_wrapper}
                >
                    <button
                        onClick={() => router.push('/register')}
                        className={scss.button}
                    >
                        Выбрать
                    </button>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};
