import React from 'react';

import { motion } from 'framer-motion';
import { ListProps } from 'components/UI/Inputs/types';

import scss from '../InputSelect.module.scss';

export const InputSelectList: React.FC<ListProps> = ({
    list,
    handleSetData,
    opacity,
}) => {
    return (
        <motion.ul
            style={{ opacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={scss.list_wrapper}
        >
            {list.length !== 0 ? (
                list?.map((item) => (
                    <li
                        className={scss.list_item}
                        onClick={() => handleSetData(item.id)}
                        key={item.id}
                    >
                        {item.name}
                    </li>
                ))
            ) : (
                <li className={scss.list_empty}>Не найдено</li>
            )}
        </motion.ul>
    );
};
