import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const [authChecking, setAuthChecking] = useState(true);

    // Wait for auth to be restored from App.jsx
    useEffect(() => {
        const timer = setTimeout(() => {
            setAuthChecking(false);
        }, 600); // Give time for App.jsx to restore auth

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (authChecking) {
            return; // Wait for auth check to complete
        }

        if (user === null || user.role !== 'recruiter') {
            navigate("/");
        }
    }, [user, authChecking, navigate]);

    // Show loading state while checking auth
    if (authChecking) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-white dark:bg-slate-900'>
                <div className='text-center'>
                    <div className='text-4xl mb-4'>⏳</div>
                    <p className='text-gray-600 dark:text-gray-400'>Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Only render children after auth check is complete and user is recruiter
    if (!user || user.role !== 'recruiter') {
        return null; // Will redirect in useEffect
    }

    return (
        <>
        {children}
        </>
    )
};
export default ProtectedRoute;

