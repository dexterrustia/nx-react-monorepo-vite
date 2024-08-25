import { useEffect, EffectCallback, DependencyList, useRef } from 'react';

/**
 * Works as normal useEffect, except does not run effect on initial render.
 * Based no https://medium.com/swlh/prevent-useeffects-callback-firing-during-initial-render-the-armchair-critic-f71bc0e03536
 *
 * @param {EffectCallback} effect The `useEffect` callback function.
 * @param {DependencyList} deps An array of dependencies.
 */
export const useEffectSkipInitial = (
  effect: EffectCallback,
  deps?: DependencyList
): void => {
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effect();
    }
  }, deps);
};

export default useEffectSkipInitial;
