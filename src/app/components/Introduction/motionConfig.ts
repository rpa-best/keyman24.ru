import { Variants } from 'framer-motion';

export const mobileVariant: Variants = {
    hidden: {
        opacity: 0,
        x: 100,
    },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
    },
};

export const mobileCardVariant: Variants = {
    hidden: {
        opacity: 0,
        x: -100,
    },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
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
        x: -100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0.5,
            ease: 'easeInOut',
        },
    },
};

export const img: Variants = {
    hidden: {
        x: 150,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0.5,
            ease: 'easeInOut',
        },
    },
};
export const tags: Variants = {
    hidden: {
        y: 100,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0.5,
            ease: 'easeInOut',
        },
    },
};
