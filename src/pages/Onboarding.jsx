import React, { useState, useRef } from 'react';

const INTEREST_OPTIONS = ['Web Development', 'Finance', 'Space', 'Design', 'Other'];

export default function Onboarding({ onComplete }) {
    const fileInputRef = useRef(null);
    const [selectedInterests, setSelectedInterests] = useState(['Web Development']);
    const [otherText, setOtherText] = useState('');
    const [resumeFile, setResumeFile] = useState(null);

    const toggleInterest = (item) => {
        setSelectedInterests((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.brandTitle}>MindVault</div>

            <div style={styles.card}>
                {/* Step Indicator */}
                <div style={styles.progressTrack}>
                    <div style={styles.progressBarActive} />
                    <div style={styles.progressBarActive} />
                </div>

                <h1 style={styles.title}>What do you want to grow into?</h1>
                <p style={styles.subtitle}>
                    Choose your areas of focus. Your curated feeds will be built around them.
                </p>

                {/* Options Grid */}
                <div style={styles.interestGrid}>
                    {INTEREST_OPTIONS.map((interest) => {
                        const isSelected = selectedInterests.includes(interest);
                        return (
                            <button
                                key={interest}
                                type="button"
                                onClick={() => toggleInterest(interest)}
                                style={{
                                    ...styles.interestBtn,
                                    ...(isSelected ? styles.interestBtnSelected : styles.interestBtnUnselected),
                                }}
                            >
                                {interest}
                            </button>
                        );
                    })}
                </div>

                {/* Conditional Description Box for "Other" */}
                {selectedInterests.includes('Other') && (
                    <div style={{ marginBottom: '20px' }}>
                        <label style={styles.label}>Tell us what you'd like to learn:</label>
                        <textarea
                            placeholder="e.g., Quantum Computing, Music Production, Organic Gardening..."
                            rows={3}
                            value={otherText}
                            onChange={(e) => setOtherText(e.target.value)}
                            style={styles.textarea}
                        />
                    </div>
                )}

                <div style={styles.divider} />

                {/* Resume Dropzone */}
                <div style={styles.sectionHeading}>Unlock skill matches</div>

                <div style={styles.dropZone} onClick={() => fileInputRef.current.click()}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf"
                        style={{ display: 'none' }}
                    />

                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ marginBottom: '8px' }}
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>

                    <div style={styles.dropZoneText}>
                        {resumeFile ? (
                            <strong style={{ color: '#818cf8' }}>Selected: {resumeFile.name}</strong>
                        ) : (
                            'Drop your Resume (PDF) to unlock Matches'
                        )}
                    </div>
                    <div style={styles.dropZoneSubtext}>or click to browse · PDF format only</div>
                </div>

                {/* Footer Actions */}
                <div style={styles.footer}>
                    <button type="button" style={styles.skipBtn} onClick={onComplete}>
                        Skip for now
                    </button>

                    <button type="button" style={styles.continueBtn} onClick={onComplete}>
                        Continue to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#0d1117',
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
        backgroundColor: '#161b22',
        borderRadius: '16px',
        border: '1px solid #30363d',
        width: '100%',
        maxWidth: '520px',
        padding: '32px',
        boxSizing: 'border-box',
    },
    progressTrack: {
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
    },
    progressBarActive: {
        flex: 1,
        height: '3px',
        backgroundColor: '#6366f1',
        borderRadius: '2px',
    },
    title: {
        fontSize: '22px',
        fontWeight: '700',
        color: '#f0f6fc',
        marginBottom: '6px',
    },
    subtitle: {
        fontSize: '13px',
        color: '#8b949e',
        marginBottom: '20px',
        lineHeight: '1.4',
    },
    interestGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        marginBottom: '16px',
    },
    interestBtn: {
        padding: '11px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
    },
    interestBtnSelected: {
        backgroundColor: '#6366f1',
        color: '#ffffff',
        border: '1px solid #6366f1',
    },
    interestBtnUnselected: {
        backgroundColor: '#0d1117',
        color: '#c9d1d9',
        border: '1px solid #30363d',
    },
    label: {
        display: 'block',
        fontSize: '13px',
        fontWeight: '600',
        color: '#c9d1d9',
        marginBottom: '6px',
    },
    textarea: {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #30363d',
        fontSize: '13px',
        backgroundColor: '#0d1117',
        color: '#f0f6fc',
        outline: 'none',
        boxSizing: 'border-box',
        resize: 'vertical',
    },
    divider: {
        height: '1px',
        backgroundColor: '#21262d',
        margin: '20px 0',
    },
    sectionHeading: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#f0f6fc',
        marginBottom: '10px',
    },
    dropZone: {
        border: '1.5px dashed #4338ca',
        backgroundColor: '#0d1117',
        borderRadius: '12px',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginBottom: '24px',
    },
    dropZoneText: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#f0f6fc',
        marginBottom: '4px',
        textAlign: 'center',
    },
    dropZoneSubtext: {
        fontSize: '12px',
        color: '#8b949e',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    skipBtn: {
        background: 'none',
        border: 'none',
        color: '#8b949e',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        padding: 0,
    },
    continueBtn: {
        backgroundColor: '#6366f1',
        color: '#ffffff',
        border: 'none',
        padding: '10px 18px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
    },
};