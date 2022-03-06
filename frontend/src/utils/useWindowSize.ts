import { useState, useEffect } from 'react';

// Get the current size of the browser window
// https://usehooks.com/useWindowSize/
const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  // useEffect only runs client-side
  useEffect(() => {
    // Get current window width and height
    const { innerWidth: width, innerHeight: height } = window;

    // Handler to call on window resize to set window width/height to state
    const handleResize = () => setWindowSize({ width, height });

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
};

export default useWindowSize;
