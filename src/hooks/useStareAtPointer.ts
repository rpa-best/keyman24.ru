import { RefObject, useEffect } from 'react';

const mouseMoveElements: Set<RefObject<HTMLElement>> = new Set();

let clientX = 0;
let clientY = 0;

let lastClientY = 0;

function TransformElement() {
    [...mouseMoveElements].forEach((el) => {
        if (!el.current) {
            return;
        }

        const elemRect = el.current?.getBoundingClientRect();
        const elemCenterCoords = {
            x: Math.round((elemRect.left + elemRect.right) / 2),
            y: Math.round((elemRect.top + elemRect.bottom) / 2),
        };

        const distanceBetween = Math.sqrt(
            (clientY - elemCenterCoords.y) ** 2 +
                (clientX - elemCenterCoords.x) ** 2
        );

        const elemDegree =
            (Math.atan2(
                clientY - elemCenterCoords.y,
                clientX - elemCenterCoords.x
            ) *
                180) /
            Math.PI;
        el.current.style.transform = `perspective(${distanceBetween}px) rotateY(-4deg)`;
        el.current.style.rotate = `${elemDegree}deg`;
    });
}

window.addEventListener('mousemove', (ev) => {
    clientY = ev.clientY;
    clientX = ev.clientX;
    lastClientY = ev.clientY;
    TransformElement();
});

window.addEventListener('scroll', () => {
    clientY = window.scrollY + lastClientY;

    TransformElement();
});

export const useStareAtPointer = (ref: RefObject<HTMLElement>) => {
    useEffect(() => {
        mouseMoveElements.add(ref);

        return () => {
            mouseMoveElements.delete(ref);
        };
    }, [ref]);
};
