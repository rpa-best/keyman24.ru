import { Variants } from 'framer-motion';

export const mobileVariant: Variants = {
    hidden: {
        opacity: 1,
    },
    visible: {
        opacity: 1,
    },
};

export const section: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};

export const card: Variants = {
    hidden: {
        x: -20,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0.5,
        },
    },
};

export const img: Variants = {
    hidden: {
        overflow: 'hidden',
        x: '8%',
        opacity: 0,
    },
    visible: {
        overflow: 'auto',
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0.5,
        },
    },
};
export const tags: Variants = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0.5,
        },
    },
};
