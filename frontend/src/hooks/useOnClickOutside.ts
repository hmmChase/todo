import { useEffect } from 'react';
import type { RefObject } from 'react';

// https://usehooks.com/useOnClickOutside/
// https://usehooks-ts.com/react-hook/use-on-click-outside

type UseOnClickOutside = (
  handler: (e: Event) => void,
  ref: RefObject<HTMLElement>
) => void;

type Listener = (event: MouseEvent | TouchEvent) => void;

const useOnClickOutside: UseOnClickOutside = (handler, ref) =>
  useEffect(
    () => {
      const listener: Listener = e => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(e.target as Node)) return;

        handler(e);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    // Add ref and handler to effect dependencies
    // Because the passed in handler is a new function on every render, that
    // will cause this effect callback/cleanup to run every render.
    // It's not a big deal, but to optimize you can wrap handler in useCallback
    // before passing it into this hook.

    [handler, ref]
  );

export default useOnClickOutside;
