import React, { useState } from 'react';

export default function Auth({ onNavigateToOnboarding, onNavigateToHome }) {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: 'Prefer not to say'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            onNavigateToHome(); // Goes directly to Home Dashboard
        } else {
            onNavigateToOnboarding(formData); // Goes to Onboarding
        }
    };

    const handleGoogleAuth = () => {
        onNavigateToHome();
    };

    return (
        <div style={styles.container}>
            <div style={styles.brandTitle}>MindVault</div>

            <div style={styles.card}>
                {/* Toggle Switch */}
                <div style={styles.tabContainer}>
                    <button
                        type="button"
                        style={{ ...styles.tabBtn, ...(!isLogin ? styles.activeTab : {}) }}
                        onClick={() => setIsLogin(false)}
                    >
                        Create Account
                    </button>
                    <button
                        type="button"
                        style={{ ...styles.tabBtn, ...(isLogin ? styles.activeTab : {}) }}
                        onClick={() => setIsLogin(true)}
                    >
                        Sign In
                    </button>
                </div>

                <h1 style={styles.title}>{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
                <p style={styles.subtitle}>
                    {isLogin
                        ? 'Sign in to access your dashboard and diary.'
                        : 'Get started by setting up your MindVault account.'}
                </p>

                {/* Google Authentication Button */}
                <button type="button" onClick={handleGoogleAuth} style={styles.googleBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '10px' }}>
                        <path
                            fill="#EA4335"
                            d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                        />
                        <path
                            fill="#4285F4"
                            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                        />
                    </svg>
                    {isLogin ? 'Sign in with Google' : 'Join with Google'}
                </button>

                <div style={styles.dividerRow}>
                    <span style={styles.line}></span>
                    <span style={styles.orText}>or</span>
                    <span style={styles.line}></span>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {!isLogin && (
                        <>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Alex Morgan"
                                    required
                                    style={styles.input}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Gender</label>
                                <select
                                    style={styles.select}
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="Prefer not to say">Prefer not to say</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-binary">Non-binary</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="alex@example.com"
                            required
                            style={styles.input}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            style={styles.input}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" style={styles.primaryBtn}>
                        {isLogin ? 'Sign In to MindVault' : 'Continue to Setup'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#0a0f1d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
    },
    brandTitle: {
        fontWeight: '800',
        fontSize: '24px',
        color: '#f0f6fc',
        marginBottom: '20px',
        letterSpacing: '-0.5px',
    },
    card: {
        backgroundColor: '#0f172a',
        borderRadius: '16px',
        border: '1px solid #1e293b',
        width: '100%',
        maxWidth: '480px',
        padding: '32px',
        boxSizing: 'border-box',
    },
    tabContainer: {
        display: 'flex',
        backgroundColor: '#0a0f1d',
        borderRadius: '8px',
        padding: '4px',
        marginBottom: '20px',
        border: '1px solid #1e293b',
    },
    tabBtn: {
        flex: 1,
        padding: '9px',
        fontSize: '13px',
        fontWeight: '600',
        border: 'none',
        backgroundColor: 'transparent',
        color: '#94a3b8',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    activeTab: {
        backgroundColor: '#1e293b',
        color: '#f0f6fc',
    },
    title: {
        fontSize: '22px',
        fontWeight: '700',
        color: '#f0f6fc',
        marginBottom: '6px',
    },
    subtitle: {
        fontSize: '13px',
        color: '#94a3b8',
        marginBottom: '20px',
    },
    googleBtn: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '8px',
        color: '#f0f6fc',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        marginBottom: '16px',
    },
    dividerRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
    },
    line: {
        flex: 1,
        height: '1px',
        backgroundColor: '#1e293b',
    },
    orText: {
        padding: '0 10px',
        fontSize: '12px',
        color: '#94a3b8',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#cbd5e1',
    },
    input: {
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #1e293b',
        fontSize: '14px',
        backgroundColor: '#0a0f1d',
        color: '#f0f6fc',
        outline: 'none',
    },
    select: {
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #1e293b',
        fontSize: '14px',
        backgroundColor: '#0a0f1d',
        color: '#f0f6fc',
        outline: 'none',
    },
    primaryBtn: {
        marginTop: '8px',
        padding: '11px',
        backgroundColor: '#6366f1',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
    },
};