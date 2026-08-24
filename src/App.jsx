import React, { useState } from 'react';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';

export default function App() {
    const [currentPage, setCurrentPage] = useState('auth');

    return (
        <>
            {currentPage === 'auth' && (
                <Auth
                    onNavigateToOnboarding={() => setCurrentPage('onboarding')}
                    onNavigateToHome={() => setCurrentPage('home')}
                />
            )}

            {currentPage === 'onboarding' && (
                <Onboarding onComplete={() => setCurrentPage('home')} />
            )}

            {currentPage === 'home' && (
                <Home onNavigateToDiary={() => alert('Opening Diary...')} />
            )}
        </>
    );
}