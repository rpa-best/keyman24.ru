import React from 'react';

import { SvgContainer } from 'app/components/Advantages/SvgContainer';
import { advData } from 'app/components/Advantages/advData';

import scss from './Advantages.module.scss';

export const Advantages = () => {
    return (
        <section className={scss.main_adv_wrapper}>
            <div className={scss.main_adv_content}>
                <div className={scss.main_adv_header}>Главные преимущества</div>
                <div className={scss.advs}>
                    {advData.map((el, i) => (
                        <div className={scss.adv_wrapper}>
                            <SvgContainer elem={el.svg} />
                            <h5>{el.title}</h5>
                            <p>{el.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
