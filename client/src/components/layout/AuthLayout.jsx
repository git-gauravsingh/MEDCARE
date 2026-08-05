import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* The Login/Signup components will render here */}
            <Outlet />
        </div>
    );
};

export default AuthLayout;