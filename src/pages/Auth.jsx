import React, { useState } from 'react';

export default function Auth({ onNavigateToOnboarding, onNavigateToHome }) {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', gender: 'Prefer not to say' });
    const [focused, setFocused] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        isLogin ? onNavigateToHome() : onNavigateToOnboarding(formData);
    };

    const inputStyle = (field) => ({
        ...s.input,
        borderColor: focused === field ? '#6366F1' : 'rgba(255,255,255,0.1)',
        boxShadow: focused === field ? '0 0 0 3px rgba(99,102,241,0.2)' : 'none',
    });

    return (
        <div style={s.page}>
            {/* Decorative blobs */}
            <div style={s.blob1} />
            <div style={s.blob2} />
            <div style={s.blob3} />

            {/* Brand */}
            <div style={s.brand} className="anim-fadeUp">
                <div style={s.logoMark}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                    </svg>
                </div>
                <span style={s.brandName}>MindVault</span>
            </div>

            {/* Hero text */}
            <div style={s.hero} className="anim-fadeUp">
                <h1 style={s.heroTitle}>
                    Learn Smarter,{' '}
                    <span style={s.gradText}>Grow Faster</span>
                </h1>
                <p style={s.heroSub}>Your AI-powered learning companion for developers & creators.</p>
            </div>

            {/* Card */}
            <div style={s.card} className="anim-fadeUp">
                {/* Gradient top bar */}
                <div style={s.cardAccentBar} />

                {/* Tab toggle */}
                <div style={s.tabs}>
                    {['Create Account', 'Sign In'].map((label, i) => {
                        const active = i === 0 ? !isLogin : isLogin;
                        return (
                            <button key={label} type="button"
                                onClick={() => setIsLogin(i === 1)}
                                style={{ ...s.tabBtn, ...(active ? s.tabBtnActive : {}) }}>
                                {label}
                            </button>
                        );
                    })}
                </div>

                <h2 style={s.cardTitle}>{isLogin ? 'Welcome back 👋' : 'Create your account'}</h2>
                <p style={s.cardSub}>{isLogin ? 'Sign in to continue your learning journey.' : 'Start learning smarter today — it\'s free.'}</p>

                {/* Google */}
                <button type="button" onClick={onNavigateToHome} style={s.googleBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '10px', flexShrink: 0 }}>
                        <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                        <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z" />
                        <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z" />
                    </svg>
                    {isLogin ? 'Continue with Google' : 'Sign up with Google'}
                </button>

                <div style={s.divRow}>
                    <span style={s.divLine} /><span style={s.divText}>or</span><span style={s.divLine} />
                </div>

                <form onSubmit={handleSubmit} style={s.form}>
                    {!isLogin && (
                        <>
                            <div style={s.field}>
                                <label style={s.label}>Full Name</label>
                                <input type="text" placeholder="Alex Morgan" required style={inputStyle('name')}
                                    value={formData.name} onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div style={s.field}>
                                <label style={s.label}>Gender</label>
                                <select style={inputStyle('gender')} value={formData.gender}
                                    onFocus={() => setFocused('gender')} onBlur={() => setFocused('')}
                                    onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                                    {['Prefer not to say','Male','Female','Non-binary','Other'].map(o => <option key={o}>{o}</option>)}
                                </select>
                            </div>
                        </>
                    )}
                    <div style={s.field}>
                        <label style={s.label}>Email Address</label>
                        <input type="email" placeholder="alex@example.com" required style={inputStyle('email')}
                            value={formData.email} onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                            onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div style={s.field}>
                        <label style={s.label}>Password</label>
                        <input type="password" placeholder="••••••••" required style={inputStyle('password')}
                            value={formData.password} onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                            onChange={e => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <button type="submit" style={s.submitBtn}>
                        {isLogin ? 'Sign In →' : 'Create Account →'}
                    </button>
                </form>
            </div>

            {/* Features row */}
            <div style={s.features} className="anim-fadeUp">
                {[
                    { icon: '⚡', text: 'AI-Powered Feed' },
                    { icon: '🎯', text: 'Skill Tracking' },
                    { icon: '📝', text: 'Smart Notes' },
                ].map(f => (
                    <div key={f.text} style={s.featureItem}>
                        <span>{f.icon}</span>
                        <span style={s.featureText}>{f.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const s = {
    page: {
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '32px 16px', position: 'relative', overflow: 'hidden',
        fontFamily: "'Geist','Inter',sans-serif",
    },
    blob1: { position: 'fixed', top: '-15%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 },
    blob2: { position: 'fixed', bottom: '-20%', right: '-10%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.16) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 },
    blob3: { position: 'fixed', top: '40%', left: '60%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 },
    brand: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', position: 'relative', zIndex: 1 },
    logoMark: { width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#6366F1,#EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    brandName: { fontFamily: "'Sora',sans-serif", fontWeight: '800', fontSize: '20px', color: '#F1F5F9', letterSpacing: '-0.02em' },
    hero: { textAlign: 'center', marginBottom: '28px', position: 'relative', zIndex: 1 },
    heroTitle: { fontFamily: "'Sora',sans-serif", fontSize: '30px', fontWeight: '800', color: '#F1F5F9', lineHeight: '1.2', marginBottom: '8px' },
    gradText: { background: 'linear-gradient(135deg,#6366F1,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
    heroSub: { fontSize: '14px', color: '#94A3B8' },
    card: {
        background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
        width: '100%', maxWidth: '440px', overflow: 'hidden',
        position: 'relative', zIndex: 1,
        boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1)',
    },
    cardAccentBar: { height: '3px', background: 'linear-gradient(90deg,#6366F1,#EC4899,#06B6D4)', width: '100%' },
    tabs: { display: 'flex', gap: '4px', padding: '16px 24px 0', background: 'transparent' },
    tabBtn: { flex: 1, padding: '9px', fontSize: '13px', fontWeight: '600', border: 'none', backgroundColor: 'transparent', color: '#64748B', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Geist',sans-serif" },
    tabBtnActive: { backgroundColor: 'rgba(99,102,241,0.15)', color: '#A5B4FC', border: '1px solid rgba(99,102,241,0.3)' },
    cardTitle: { fontFamily: "'Sora',sans-serif", fontSize: '22px', fontWeight: '700', color: '#F1F5F9', padding: '16px 24px 4px', letterSpacing: '-0.02em' },
    cardSub: { fontSize: '13px', color: '#64748B', padding: '0 24px 20px' },
    googleBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'calc(100% - 48px)', margin: '0 24px 16px', padding: '11px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', color: '#E2E8F0', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', fontFamily: "'Geist',sans-serif" },
    divRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '0 24px 16px' },
    divLine: { flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' },
    divText: { fontSize: '12px', color: '#475569', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' },
    form: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '0 24px 24px' },
    field: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '11px', fontWeight: '600', color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Geist',sans-serif" },
    input: { padding: '11px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', backgroundColor: 'rgba(0,0,0,0.3)', color: '#F1F5F9', outline: 'none', transition: 'border-color 0.2s,box-shadow 0.2s', fontFamily: "'Geist',sans-serif", width: '100%' },
    submitBtn: { marginTop: '4px', padding: '13px', background: 'linear-gradient(135deg,#6366F1,#EC4899)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Geist',sans-serif", letterSpacing: '0.01em', transition: 'opacity 0.2s,transform 0.15s', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' },
    features: { display: 'flex', gap: '24px', marginTop: '28px', position: 'relative', zIndex: 1 },
    featureItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' },
    featureText: { fontFamily: "'Geist',sans-serif" },
};