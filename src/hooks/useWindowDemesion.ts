import { useState, useEffect } from 'react';

function getWindoWidth() {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindoWidth());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindoWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;