import React, { useState } from 'react';

const QUESTIONS = [
    {
        id: 1,
        title: 'What is your current goal?',
        subtitle: 'Select the goal that best describes what you want to achieve.',
        multiple: false,
        options: ['🎓 Learn new skills', '💼 Get a job', '🚀 Prepare for internships', '🏆 Prepare for hackathons', '📚 Improve academics', '🔄 Switch career'],
    },
    {
        id: 2,
        title: 'What is your experience level?',
        subtitle: 'This helps us tailor the difficulty of your recommendations.',
        multiple: false,
        options: ['🌱 Beginner', '📖 Basic knowledge', '⚡ Intermediate', '🚀 Advanced'],
    },
    {
        id: 3,
        title: 'What skills do you want to learn?',
        subtitle: 'Select all that interest you.',
        multiple: true,
        options: ['💻 Programming', '🌐 Web Development', '🤖 AI / ML', '📊 Data Science', '🛡️ Cybersecurity', '🎨 UI / UX', '☁️ Cloud Computing', '🗣️ Communication'],
    },
    {
        id: 4,
        title: 'How much time can you learn daily?',
        subtitle: `We'll curate bite-sized or deep-dive resources based on your pace.`,
        multiple: false,
        options: ['⏱️ 15–30 minutes', '⏱️ 30–60 minutes', '⏱️ 1–2 hours', '🔥 2+ hours'],
    },
    {
        id: 5,
        title: 'How do you prefer to learn?',
        subtitle: 'Pick your top formats to filter resource types.',
        multiple: true,
        options: ['🎥 Videos', '📄 Articles', '💻 Hands-on projects', '🧩 Quizzes', '📝 Notes', '🤖 AI-guided learning'],
    },
    {
        id: 6,
        title: 'What content do you want in your feed?',
        subtitle: 'Choose what cards appear on your dashboard.',
        multiple: true,
        options: ['📰 Tech news', '📚 Tutorials', '💡 Project ideas', '🎯 Interview prep', '🏆 Hackathons', '📈 Industry trends'],
    },
    {
        id: 7,
        title: 'What is your learning style?',
        subtitle: 'How would you like complex ideas delivered?',
        multiple: false,
        options: ['🪜 Step-by-step', '⚡ Short explanations', '📖 Detailed explanations', '🔍 Examples first', '🛠️ Practice first'],
    },
    {
        id: 8,
        title: 'What are you working on now?',
        subtitle: 'Connect your learning to your current context.',
        multiple: false,
        options: ['🏫 College project', '💡 Personal project', '🏆 Hackathon', '💼 Internship prep', '✨ Nothing currently'],
    },
    {
        id: 9,
        title: 'What is your target role?',
        subtitle: `We'll benchmark your skill gaps against this career path.`,
        multiple: false,
        options: ['🎨 Frontend Developer', '⚙️ Backend Developer', '🚀 Full Stack Developer', '🤖 AI/ML Engineer', '📊 Data Scientist', '✨ UI/UX Designer', '🛡️ Cybersecurity Engineer'],
    },
    {
        id: 10,
        title: 'What are your biggest learning challenges?',
        subtitle: 'Select roadblocks so MindVault can help overcome them.',
        multiple: true,
        options: ["😵 Don't know where to start", '⏰ Lack of time', '😕 Hard to understand concepts', "🎯 Can't stay consistent", "🔍 Can't find good resources", "💡 Don't know what to learn next"],
    },
];

const STEP_COLORS = ['#6366F1', '#EC4899', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6', '#06B6D4'];

export default function Personalize({ onComplete }) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const q = QUESTIONS[step];
    const color = STEP_COLORS[step];
    const selected = answers[q.id] || (q.multiple ? [] : '');
    const progress = ((step + 1) / QUESTIONS.length) * 100;

    const pick = (opt) => {
        if (q.multiple) {
            const cur = Array.isArray(selected) ? selected : [];
            setAnswers({ ...answers, [q.id]: cur.includes(opt) ? cur.filter(i => i !== opt) : [...cur, opt] });
        } else {
            setAnswers({ ...answers, [q.id]: opt });
        }
    };

    const next = () => step < QUESTIONS.length - 1 ? setStep(s => s + 1) : onComplete(answers);
    const isAnswered = q.multiple ? (Array.isArray(selected) && selected.length > 0) : Boolean(selected);

    return (
        <div style={s.page}>
            {/* Brand */}
            <div style={s.brand}>
                <div style={{ ...s.logoMark, background: `linear-gradient(135deg, ${color}, #EC4899)` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                    </svg>
                </div>
                <span style={s.brandName}>MindVault</span>
            </div>

            {/* Card */}
            <div style={s.card} className="anim-fadeUp">
                {/* Progress bar */}
                <div style={s.progressTrack}>
                    <div style={{ ...s.progressFill, width: `${progress}%`, backgroundColor: color }} />
                </div>

                <div style={s.body}>
                    {/* Step counter */}
                    <div style={s.stepRow}>
                        <span style={{ ...s.stepNum, color }}>{step + 1}</span>
                        <span style={s.stepOf}>/ {QUESTIONS.length}</span>
                        {q.multiple && (
                            <span style={{ ...s.multiTag, borderColor: `${color}55`, color }}>Multi-select</span>
                        )}
                    </div>

                    <h1 style={s.title}>{q.title}</h1>
                    <p style={s.subtitle}>{q.subtitle}</p>

                    {/* Options */}
                    <div style={s.options}>
                        {q.options.map(opt => {
                            const sel = q.multiple
                                ? (Array.isArray(selected) && selected.includes(opt))
                                : selected === opt;
                            return (
                                <button key={opt} type="button" onClick={() => pick(opt)} style={{
                                    ...s.optBtn,
                                    background: sel ? `${color}18` : 'rgba(255,255,255,0.03)',
                                    border: sel ? `1.5px solid ${color}` : '1px solid rgba(255,255,255,0.1)',
                                    color: sel ? '#F1F5F9' : '#94A3B8',
                                }}>
                                    {opt}
                                    {sel && <span style={{ ...s.check, background: color }}>✓</span>}
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div style={s.footer}>
                        <button type="button" style={s.skipBtn} onClick={next}>Skip</button>
                        <button type="button" onClick={next} style={{
                            ...s.nextBtn,
                            background: isAnswered ? color : 'rgba(255,255,255,0.07)',
                            color: isAnswered ? '#fff' : '#475569',
                        }}>
                            {step === QUESTIONS.length - 1 ? 'Finish Setup' : 'Continue →'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const s = {
    page: {
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '32px 16px', fontFamily: "'Geist','Inter',sans-serif",
    },
    brand: {
        display: 'flex', alignItems: 'center', gap: '10px',
        marginBottom: '24px', position: 'relative', zIndex: 1,
    },
    logoMark: {
        width: '30px', height: '30px', borderRadius: '8px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.4s',
    },
    brandName: {
        fontFamily: "'Sora',sans-serif", fontWeight: '700', fontSize: '16px',
        color: '#F1F5F9', letterSpacing: '-0.01em',
    },
    card: {
        background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px', width: '100%', maxWidth: '640px',
        overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    },
    progressTrack: {
        width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.06)',
    },
    progressFill: {
        height: '100%', transition: 'width 0.4s ease, background-color 0.4s ease', borderRadius: '0 2px 2px 0',
    },
    body: { padding: '32px 36px 28px' },
    stepRow: { display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '18px' },
    stepNum: {
        fontFamily: "'Sora',sans-serif", fontSize: '32px', fontWeight: '800',
        lineHeight: 1, transition: 'color 0.3s',
    },
    stepOf: { fontSize: '16px', color: '#475569', fontWeight: '500' },
    multiTag: {
        marginLeft: '10px', fontSize: '10px', fontWeight: '600',
        padding: '2px 10px', borderRadius: '99px', border: '1px solid',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        fontFamily: "'Geist',sans-serif", transition: 'all 0.3s',
    },
    title: {
        fontFamily: "'Sora',sans-serif", fontSize: '20px', fontWeight: '700',
        color: '#F1F5F9', marginBottom: '8px', letterSpacing: '-0.01em', lineHeight: '1.3',
    },
    subtitle: { fontSize: '14px', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' },
    options: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' },
    optBtn: {
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '10px 18px', borderRadius: '8px', cursor: 'pointer',
        fontSize: '14px', fontFamily: "'Geist',sans-serif",
        transition: 'all 0.15s ease', position: 'relative',
    },
    check: {
        width: '16px', height: '16px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '9px', color: '#fff', fontWeight: '800', marginLeft: '4px', flexShrink: 0,
    },
    footer: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px',
    },
    skipBtn: {
        background: 'none', border: 'none', color: '#475569',
        fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Geist',sans-serif",
    },
    nextBtn: {
        padding: '11px 24px', borderRadius: '8px', border: 'none',
        fontSize: '14px', fontWeight: '700', cursor: 'pointer',
        transition: 'all 0.25s', fontFamily: "'Geist',sans-serif",
    },
};