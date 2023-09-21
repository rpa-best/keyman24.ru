'use client';

import React, { useCallback } from 'react';

type debounceType = (
    func: (args?: any) => void,
    delayMs: number
) => (args: any) => void;

export const useDebounce: debounceType = (func, delayMs) => {
    const prevTimeoutIdRef = React.useRef<any>();

    return useCallback(
        (...args: any) => {
            clearTimeout(prevTimeoutIdRef.current);
            prevTimeoutIdRef.current = setTimeout(() => {
                clearTimeout(prevTimeoutIdRef.current);
                func(...args);
            }, delayMs);
        },
        [delayMs, func]
    );
};

export function debounce(func: (args?: any) => void, delayMs: number) {
    let timeoutId: any;

    return new Promise<void>((res) => {
        return function (this: any, ...args: any) {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(this, args);
                res();
            }, delayMs);
        };
    });
}
