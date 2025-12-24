import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isFirstRender = useRef(true);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    // Force redirect to home on initial load/refresh
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            if (location.pathname !== '/') {
                navigate('/', { replace: true });
            }
        }
    }, [navigate, location.pathname]);

    return null;
};

export default NavigationHandler;
