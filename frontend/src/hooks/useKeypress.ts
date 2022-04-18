// https://usehooks.com/useKeyPress/
// https://github.com/react-typed-hooks/react-typed-hooks/blob/main/packages/useKeyPress/src/useKeyPress.ts

import { useCallback, useEffect, useState } from 'react';

const useKeyPress = (targetKey: string): boolean => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) setKeyPressed(true);
    },

    [targetKey]
  );

  // If released key is our target key then set to false
  const upHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) setKeyPressed(false);
    },

    [targetKey]
  );

  const hasWindow = () => typeof window === 'object';

  // Add event listeners
  useEffect(() => {
    if (!hasWindow()) return;

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
};

export default useKeyPress;
