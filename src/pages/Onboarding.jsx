import React, { useState, useRef } from 'react';

const INTEREST_OPTIONS = [
    { label: 'Web Development', emoji: '🌐', color: '#6366F1' },
    { label: 'Finance',         emoji: '💹', color: '#10B981' },
    { label: 'Space',           emoji: '🚀', color: '#06B6D4' },
    { label: 'Design',          emoji: '🎨', color: '#EC4899' },
    { label: 'AI / ML',         emoji: '🤖', color: '#8B5CF6' },
    { label: 'Other',           emoji: '✨', color: '#F59E0B' },
];

export default function Onboarding({ onComplete }) {
    const fileInputRef = useRef(null);
    const [selectedInterests, setSelectedInterests] = useState(['Web Development']);
    const [otherText, setOtherText] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const toggle = (label) => setSelectedInterests(prev =>
        prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );

    const handleDrop = (e) => {
        e.preventDefault(); setIsDragOver(false);
        const f = e.dataTransfer.files[0];
        if (f?.type === 'application/pdf') setResumeFile(f);
    };

    return (
        <div style={s.page}>
            <div style={s.blob1} /><div style={s.blob2} />

            {/* Brand */}
            <div style={s.brand}>
                <div style={s.logoMark}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                    </svg>
                </div>
                <span style={s.brandName}>MindVault</span>
            </div>

            {/* Card */}
            <div style={s.card} className="anim-fadeUp">
                {/* Progress bar */}
                <div style={s.progressTrack}>
                    <div style={s.progressFill} />
                    <div style={s.progressFill} />
                </div>

                <div style={s.body}>
                    {/* Step badge */}
                    <div style={s.stepBadge}>Step 2 of 3</div>

                    <h1 style={s.title}>
                        What do you want to{' '}
                        <span style={s.gradText}>grow into?</span>
                    </h1>
                    <p style={s.subtitle}>
                        Pick your areas of focus. We'll build your curated feed around them.
                    </p>

                    {/* Interest pills */}
                    <div style={s.pillGrid}>
                        {INTEREST_OPTIONS.map(({ label, emoji, color }) => {
                            const sel = selectedInterests.includes(label);
                            return (
                                <button key={label} type="button" onClick={() => toggle(label)}
                                    style={{
                                        ...s.pill,
                                        background: sel ? `${color}22` : 'rgba(255,255,255,0.04)',
                                        border: sel ? `2px solid ${color}` : '1px solid rgba(255,255,255,0.1)',
                                        color: sel ? color : '#94A3B8',
                                        boxShadow: sel ? `0 0 20px ${color}30` : 'none',
                                    }}>
                                    <span style={{ fontSize: '18px' }}>{emoji}</span>
                                    <span style={{ fontWeight: sel ? '700' : '500', fontSize: '13px' }}>{label}</span>
                                    {sel && <span style={{ ...s.checkDot, backgroundColor: color }}>✓</span>}
                                </button>
                            );
                        })}
                    </div>

                    {/* "Other" text */}
                    {selectedInterests.includes('Other') && (
                        <div style={{ marginBottom: '20px' }}>
                            <label style={s.label}>Tell us more:</label>
                            <textarea placeholder="e.g. Quantum Computing, Music Production..." rows={3}
                                value={otherText} onChange={e => setOtherText(e.target.value)} style={s.textarea} />
                        </div>
                    )}

                    <div style={s.divider} />

                    {/* Resume upload */}
                    <div style={s.sectionLabel}>
                        <span style={{ background: 'linear-gradient(135deg,#6366F1,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: '700' }}>
                            ✦ Unlock AI skill matching
                        </span>
                        <span style={{ fontSize: '12px', color: '#475569', marginLeft: '8px' }}>Upload your resume</span>
                    </div>

                    <div
                        style={{
                            ...s.dropzone,
                            borderColor: isDragOver ? '#6366F1' : resumeFile ? '#10B981' : 'rgba(99,102,241,0.35)',
                            background: isDragOver ? 'rgba(99,102,241,0.08)' : resumeFile ? 'rgba(16,185,129,0.06)' : 'rgba(99,102,241,0.04)',
                        }}
                        onClick={() => fileInputRef.current.click()}
                        onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                    >
                        <input type="file" ref={fileInputRef} onChange={e => setResumeFile(e.target.files?.[0] || null)} accept=".pdf" style={{ display: 'none' }} />
                        <div style={{ fontSize: '28px', marginBottom: '8px' }}>{resumeFile ? '✅' : '📄'}</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: resumeFile ? '#10B981' : '#E2E8F0', marginBottom: '4px' }}>
                            {resumeFile ? resumeFile.name : 'Drop resume (PDF) here'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#475569' }}>{resumeFile ? 'Resume uploaded' : 'or click to browse · PDF only'}</div>
                    </div>

                    {/* Footer */}
                    <div style={s.footer}>
                        <button type="button" style={s.skipBtn} onClick={onComplete}>Skip for now</button>
                        <button type="button" style={s.continueBtn} onClick={onComplete}>
                            Continue to Personalize →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const s = {
    page: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', position: 'relative', overflow: 'hidden', fontFamily: "'Geist','Inter',sans-serif" },
    blob1: { position: 'fixed', top: '-20%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 },
    blob2: { position: 'fixed', bottom: '-15%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(236,72,153,0.14) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 },
    brand: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', position: 'relative', zIndex: 1 },
    logoMark: { width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg,#6366F1,#EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    brandName: { fontFamily: "'Sora',sans-serif", fontWeight: '800', fontSize: '18px', color: '#F1F5F9', letterSpacing: '-0.02em' },
    card: { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', width: '100%', maxWidth: '580px', overflow: 'hidden', position: 'relative', zIndex: 1, boxShadow: '0 25px 50px rgba(0,0,0,0.4)' },
    progressTrack: { display: 'flex', gap: '3px', height: '4px' },
    progressFill: { flex: 1, background: 'linear-gradient(90deg,#6366F1,#EC4899)', boxShadow: '0 0 8px rgba(99,102,241,0.6)' },
    body: { padding: '32px 36px 28px' },
    stepBadge: { display: 'inline-block', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#A5B4FC', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '99px', marginBottom: '16px', fontFamily: "'Geist',sans-serif" },
    title: { fontFamily: "'Sora',sans-serif", fontSize: '24px', fontWeight: '700', color: '#F1F5F9', marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: '1.3' },
    gradText: { background: 'linear-gradient(135deg,#6366F1,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
    subtitle: { fontSize: '14px', color: '#64748B', marginBottom: '28px', lineHeight: '1.5' },
    pillGrid: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' },
    pill: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: "'Geist',sans-serif", position: 'relative' },
    checkDot: { width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', fontWeight: '700', marginLeft: '2px', flexShrink: 0 },
    label: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#94A3B8', marginBottom: '8px', letterSpacing: '0.06em', textTransform: 'uppercase' },
    textarea: { width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px', backgroundColor: 'rgba(0,0,0,0.3)', color: '#F1F5F9', outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: "'Geist',sans-serif", lineHeight: '1.5' },
    divider: { height: '1px', background: 'rgba(255,255,255,0.07)', margin: '20px 0' },
    sectionLabel: { fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center' },
    dropzone: { border: '1.5px dashed rgba(99,102,241,0.35)', borderRadius: '12px', padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', marginBottom: '28px', transition: 'all 0.2s' },
    footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px' },
    skipBtn: { background: 'none', border: 'none', color: '#475569', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Geist',sans-serif" },
    continueBtn: { background: 'linear-gradient(135deg,#6366F1,#EC4899)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Geist',sans-serif", boxShadow: '0 4px 20px rgba(99,102,241,0.4)' },
};