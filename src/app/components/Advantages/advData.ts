import { ReactElement } from 'react';

export const advData: {
    title: string;
    text: string;
    svg: 'lock' | 'heart' | 'light' | 'stars';
}[] = [
    {
        svg: 'heart',
        text: 'Use this text to describe your product feature or service.',
        title: 'Personal support',
    },
    {
        svg: 'light',
        text: 'Use this text to describe your product feature or service.',
        title: 'Lighting fast',
    },
    {
        svg: 'stars',
        text: 'Use this text to describe your product feature or service.',
        title: 'Clean design',
    },
    {
        svg: 'lock',
        text: 'Use this text to describe your product feature or service.',
        title: 'Advanced security',
    },
];
