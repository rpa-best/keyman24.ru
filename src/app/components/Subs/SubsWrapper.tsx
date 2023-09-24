'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';

import { IService } from 'http/types';
import { Circles } from 'app/components/Subs/SubsCircles/Circles';
import { element, section } from 'app/components/Subs/motionConfig';
import { RangeSlider } from 'components/UI/Inputs/RangeSlider';
import { useConstructorStore } from 'store/useConstructorStore';
import { useRouter } from 'next/navigation';
import { useServices } from 'hooks/useServices';
import { usePrice } from 'hooks/usePrice';

import scss from './Subs.module.scss';

interface SubsWrapperProps {
    services: IService[];
}

export const SubsWrapper: React.FC<SubsWrapperProps> = ({ services }) => {
    const [fields] = useConstructorStore((state) => [state.fields]);
    const [setFields] = useConstructorStore((state) => [state.setFields]);
    const price = usePrice(fields, 200);
    const router = useRouter();

    useServices(services, setFields);

    const handleInputChange = useCallback(
        (index: number, value: string) => {
            const updatedValues = [...fields];
            updatedValues[index].count = value;
            setFields(updatedValues);
            localStorage.setItem('constructor', JSON.stringify(updatedValues));
        },
        [fields, setFields]
    );

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
                {fields?.map((item, index) => (
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
                            check={item.notLimited}
                            max={item.max}
                            fields={fields}
                            index={item.id.toString()}
                            setFields={setFields}
                            onChange={(count, limited) =>
                                handleInputChange(index, count)
                            }
                        />
                    </motion.div>
                ))}
            </motion.div>
            <motion.div
                variants={element}
                custom={fields?.length + 2}
                className={scss.button_wrapper}
            >
                <button
                    onClick={() => router.push('/register')}
                    className={scss.button}
                >
                    Оформить за {price}
                </button>
            </motion.div>
        </motion.section>
    );
};
