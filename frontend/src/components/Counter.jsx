import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

export default function Counter({ from = 0, to }) {
  const [props] = useSpring(
    () => ({
      from: { number: from },
      to: { number: to },
      config: { mass: 1, tension: 20, friction: 10 },
    }),
    [from, to]
  );

  return <animated.span>{props.number.to((n) => Math.floor(n))}</animated.span>;
}