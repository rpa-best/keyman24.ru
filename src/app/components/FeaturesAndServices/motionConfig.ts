import { Variants } from 'framer-motion';

export const featureSect: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};

export const featureText: Variants = {
    hidden: {
        x: -30,
        opacity: 0,
    },
    visible: (custom) => ({
        x: 0,
        opacity: 1,
        transition: {
            delay: custom * 0.2,
        },
    }),
};

export const featureBtn: Variants = {
    hidden: {
        x: -20,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            delay: 1.2,
        },
    },
};

export const featureImg: Variants = {
    hidden: {
        x: 20,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
    },
};

export const textElem: Variants = {
    hidden: {
        opacity: 0,
        x: -20,
    },
    visible: (custom) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.2,
            delay: 0.2 * custom,
        },
    }),
};
