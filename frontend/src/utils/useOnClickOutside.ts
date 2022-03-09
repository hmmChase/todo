// https://usehooks.com/useOnClickOutside/
// https://usehooks-ts.com/react-hook/use-on-click-outside

import { RefObject, useEffect } from 'react';

type UseOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: Event) => void
) => void;

type Listener = (event: MouseEvent | TouchEvent) => void;

const useOnClickOutside: UseOnClickOutside = (ref, handler) =>
  useEffect(
    () => {
      const listener: Listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as Node)) return;

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );

export default useOnClickOutside;
