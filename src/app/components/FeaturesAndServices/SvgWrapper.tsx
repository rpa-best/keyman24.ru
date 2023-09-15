'use client';
import React from 'react';

import DoneSvg from '/public/svg/subs/done.svg';

import scss from './FeaturesAndServices.module.scss';

export const SvgWrapper = () => {
    return <DoneSvg className={scss.done_svg} />;
};
