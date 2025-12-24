import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationHandler = () => {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    return null;
};

export default NavigationHandler;
