'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { circleAnimation } from 'motionConfigs/circlesConfig';

import scss from './Circles.module.scss';

export const Circles = () => {
    return Array.from({ length: 3 }, (_, index) => index + 1).map((item, i) => (
        <motion.span
            initial="hidden"
            whileInView="visible"
            custom={item}
            viewport={{ once: true, amount: 0.4 }}
            variants={circleAnimation}
            className={scss.circle}
            key={i}
        />
    ));
};
