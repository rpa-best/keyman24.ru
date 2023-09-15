import { Variants } from 'framer-motion';

export const section: Variants = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export const element: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: (custom) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            delay: 0.1 * custom,
        },
    }),
};
