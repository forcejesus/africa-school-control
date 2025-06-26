
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReset = () => {
  const location = useLocation();

  useEffect(() => {
    // Réinitialiser le scroll à zéro lors du changement de route
    window.scrollTo(0, 0);
  }, [location.pathname]);
};
