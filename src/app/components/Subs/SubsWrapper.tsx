'use client';

import React, { useState } from 'react';

import StarsSvg from '/public/svg/subs/starsWithoutBorder.svg';
import DoneSvg from '/public/svg/subs/done.svg';
import { IService } from 'http/types';
import { Button } from 'components/UI/Button';
import { Modal } from 'components/Modal';
import { useModalStore } from 'store/modalVisibleStore';
import { Circles } from 'app/components/Subs/SubsCircles/Circles';
import { Form } from 'app/components/Form';

import scss from './Subs.module.scss';

interface SubsWrapperProps {
    subs: IService[];
}

export const SubsWrapper: React.FC<SubsWrapperProps> = ({ subs }) => {
    const [selectedSub, setSelectedSub] = useState<IService>();
    const [setVisible] = useModalStore((state) => [state.setVisible]);

    return (
        <section className={scss.subs_layout}>
            <div className={scss.subs_header}>Варианты подписок</div>
            <Circles />
            <div className={scss.subs}>
                {subs.map((service, i) => {
                    return (
                        <div
                            onClick={() => {
                                setVisible(true);
                                setSelectedSub(service);
                            }}
                            className={
                                i === 1 ? scss.variant_selected : scss.variant
                            }
                            key={i}
                        >
                            <div className={scss.card_svg_wrapper}>
                                <StarsSvg className={scss.card_svg} />
                            </div>
                            <p className={scss.var_price}>
                                <span className={scss.price}>
                                    {service.price}₽
                                </span>
                                {' / '}
                                месяц
                            </p>
                            <p className={scss.var_subheader}>
                                {service.desc?.slice(0, 28)}
                            </p>
                            <ul className={scss.desc_tags}>
                                {service.serviceRates.map((rate) => {
                                    return (
                                        <li
                                            className={scss.desc_tag_item}
                                            key={rate.id}
                                        >
                                            <DoneSvg
                                                className={scss.done_svg}
                                            />
                                            <p>{`${rate.key.name}: до ${rate.value}`}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                            <button className={scss.button} onClick={() => {}}>
                                Выбрать
                            </button>
                        </div>
                    );
                })}
                <div
                    onClick={() => {
                        setSelectedSub(undefined);
                        setVisible(true);
                    }}
                    className={scss.variant}
                >
                    <div className={scss.card_svg_wrapper}>
                        <StarsSvg className={scss.card_svg} />
                    </div>
                    <p className={scss.var_price}>
                        <span className={scss.price}>Custom</span>
                    </p>
                    <p className={scss.var_subheader}>
                        If you'd like to learn more about our enterprise
                        features, please contact us.
                    </p>
                    <span className={scss.separator} />
                    <div className={scss.button_wrapper}>
                        <button className={scss.button}>Выбрать</button>
                    </div>
                </div>
            </div>
            <Modal>
                <Form subs={subs} selectedSub={selectedSub} />
            </Modal>
        </section>
    );
};
