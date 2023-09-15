'use client';
import React from 'react';

import HeartSvg from '/public/svg/advantages/heart.svg';
import LightingSvg from '/public/svg/advantages/lighting.svg';
import LockSvg from '/public/svg/advantages/locker.svg';
import StarsSvg from '/public/svg/advantages/stars.svg';

interface SvgContainerProps {
    elem: 'lock' | 'heart' | 'light' | 'stars';
}

export const SvgContainer: React.FC<SvgContainerProps> = ({ elem }) => {
    switch (elem) {
        case 'heart':
            return <HeartSvg />;
        case 'light':
            return <LightingSvg />;
        case 'lock':
            return <LockSvg />;
        case 'stars':
            return <StarsSvg />;
    }
};
