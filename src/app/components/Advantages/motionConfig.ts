import { Variants } from 'framer-motion';

export const advSection: Variants = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export const advElement: Variants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    visible: (custom) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2 * custom,
        },
    }),
};
