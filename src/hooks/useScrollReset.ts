
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook personnalisé pour réinitialiser le scroll à zéro lors des changements de page
 */
export const useScrollReset = () => {
  const location = useLocation();

  useEffect(() => {
    // Réinitialiser le scroll à zéro à chaque changement de route
    window.scrollTo(0, 0);
  }, [location.pathname]);
};
