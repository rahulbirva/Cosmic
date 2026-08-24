import React, { useState } from 'react';

const QUESTIONS = [
    {
        id: 1,
        title: 'What is your current goal?',
        subtitle: 'Select the goal that best describes what you want to achieve right now.',
        multiple: false,
        options: [
            '🎓 Learn new skills',
            '💼 Get a job',
            '🚀 Prepare for internships',
            '🏆 Prepare for hackathons',
            '📚 Improve academics',
            '🔄 Switch career',
        ],
    },
    {
        id: 2,
        title: 'What is your current experience level?',
        subtitle: 'This helps us tailor the difficulty of recommendations in your feed.',
        multiple: false,
        options: [
            '🌱 Beginner',
            '📖 Basic knowledge',
            '⚡ Intermediate',
            '🚀 Advanced',
        ],
    },
    {
        id: 3,
        title: 'What skills do you want to learn?',
        subtitle: 'Select all skills you are interested in exploring or mastering.',
        multiple: true,
        options: [
            '💻 Programming',
            '🌐 Web Development',
            '🤖 AI / ML',
            '📊 Data Science',
            '🛡️ Cybersecurity',
            '🎨 UI / UX',
            '☁️ Cloud Computing',
            '🗣️ Communication',
        ],
    },
    {
        id: 4,
        title: 'How much time can you spend learning each day?',
        subtitle: 'We will curate bite-sized or deep-dive resources based on your pace.',
        multiple: false,
        options: [
            '⏱️ 15–30 minutes',
            '⏱️ 30–60 minutes',
            '⏱️ 1–2 hours',
            '🔥 2+ hours',
        ],
    },
    {
        id: 5,
        title: 'How do you prefer to learn?',
        subtitle: 'Pick your top formats to filter resource types.',
        multiple: true,
        options: [
            '🎥 Videos',
            '📄 Articles',
            '💻 Hands-on projects',
            '🧩 Quizzes',
            '📝 Notes',
            '🤖 AI-guided learning',
        ],
    },
    {
        id: 6,
        title: 'What type of content do you want in your feed?',
        subtitle: 'Choose what content cards appear on your main dashboard.',
        multiple: true,
        options: [
            '📰 Tech news',
            '📚 Tutorials',
            '💡 Project ideas',
            '💼 Career opportunities',
            '🎯 Interview preparation',
            '🏆 Hackathons',
            '📈 Industry trends',
        ],
    },
    {
        id: 7,
        title: 'What is your preferred learning style?',
        subtitle: 'How would you like complex explanations delivered?',
        multiple: false,
        options: [
            '🪜 Step-by-step',
            '⚡ Short explanations',
            '📖 Detailed explanations',
            '🔍 Examples first',
            '🛠️ Practice first',
        ],
    },
    {
        id: 8,
        title: 'What are you currently working on?',
        subtitle: 'Connect your learning directly to your current project context.',
        multiple: false,
        options: [
            '🏫 College project',
            '💡 Personal project',
            '🏆 Hackathon',
            '💼 Internship preparation',
            '✨ Nothing currently',
        ],
    },
    {
        id: 9,
        title: 'What is your target role?',
        subtitle: 'We will benchmark your skill gaps against this exact career path.',
        multiple: false,
        options: [
            '🎨 Frontend Developer',
            '⚙️ Backend Developer',
            '🚀 Full Stack Developer',
            '🤖 AI/ML Engineer',
            '📊 Data Scientist',
            '✨ UI/UX Designer',
            '🛡️ Cybersecurity Engineer',
        ],
    },
    {
        id: 10,
        title: 'What are your biggest learning challenges?',
        subtitle: 'Select any roadblocks you encounter so MindVault can help overcome them.',
        multiple: true,
        options: [
            "😵 Don't know where to start",
            '⏰ Lack of time',
            '😕 Difficult to understand concepts',
            "🎯 Can't stay consistent",
            "🔍 Can't find good resources",
            "💡 Don't know what to learn next",
        ],
    },
];

export default function Personalize({ onComplete }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const currentQ = QUESTIONS[currentStepIndex];
    const selectedValues = answers[currentQ.id] || (currentQ.multiple ? [] : '');

    const handleSelect = (option) => {
        if (currentQ.multiple) {
            const currentList = Array.isArray(selectedValues) ? selectedValues : [];
            const updated = currentList.includes(option)
                ? currentList.filter((item) => item !== option)
                : [...currentList, option];
            setAnswers({ ...answers, [currentQ.id]: updated });
        } else {
            setAnswers({ ...answers, [currentQ.id]: option });
        }
    };

    const handleNext = () => {
        if (currentStepIndex < QUESTIONS.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            onComplete(answers);
        }
    };

    const isCurrentAnswered = currentQ.multiple
        ? Array.isArray(selectedValues) && selectedValues.length > 0
        : Boolean(selectedValues);

    const progressPercentage = ((currentStepIndex + 1) / QUESTIONS.length) * 100;

    return (
        <div style={styles.container}>
            <div style={styles.brandTitle}>MINDVAULT</div>

            <div style={styles.card}>
                {/* Glowing Top Progress Line */}
                <div style={styles.progressBackground}>
                    <div style={{ ...styles.progressFill, width: `${progressPercentage}%` }} />
                </div>

                <div style={styles.cardBody}>
                    <h1 style={styles.title}>{currentQ.title}</h1>
                    <p style={styles.subtitle}>{currentQ.subtitle}</p>

                    {/* Pill Options Container */}
                    <div style={styles.optionsFlex}>
                        {currentQ.options.map((opt) => {
                            const isSelected = currentQ.multiple
                                ? Array.isArray(selectedValues) && selectedValues.includes(opt)
                                : selectedValues === opt;

                            return (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleSelect(opt)}
                                    style={{
                                        ...styles.pillBtn,
                                        ...(isSelected ? styles.pillBtnActive : {}),
                                    }}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>

                    {/* Bottom Navigation */}
                    <div style={styles.footer}>
                        <button
                            type="button"
                            style={styles.skipBtn}
                            onClick={handleNext}
                        >
                            Skip for now
                        </button>

                        <button
                            type="button"
                            style={{
                                ...styles.continueBtn,
                                opacity: isCurrentAnswered ? 1 : 0.65,
                            }}
                            onClick={handleNext}
                        >
                            {currentStepIndex === QUESTIONS.length - 1 ? 'Finish Setup' : 'Continue →'}
                        </button>
                    </div>
                </div>
            </div>

            <div style={styles.stepIndicator}>
                Step {currentStepIndex + 1} of {QUESTIONS.length}
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#0a0e17',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    brandTitle: {
        fontWeight: '800',
        fontSize: '20px',
        color: '#e2e8f0',
        marginBottom: '24px',
        letterSpacing: '1px',
    },
    card: {
        backgroundColor: '#151d2d',
        borderRadius: '18px',
        border: '1px solid #243048',
        width: '100%',
        maxWidth: '680px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
    },
    progressBackground: {
        width: '100%',
        height: '4px',
        backgroundColor: '#1b253b',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#818cf8',
        boxShadow: '0 0 10px rgba(129, 140, 248, 0.5)',
        transition: 'width 0.3s ease-in-out',
    },
    cardBody: {
        padding: '40px 44px',
    },
    title: {
        fontSize: '26px',
        fontWeight: '800',
        color: '#f8fafc',
        textAlign: 'center',
        margin: '0 0 8px 0',
        letterSpacing: '-0.5px',
    },
    subtitle: {
        fontSize: '14px',
        color: '#94a3b8',
        textAlign: 'center',
        margin: '0 0 32px 0',
        lineHeight: '1.5',
    },
    optionsFlex: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '40px',
    },
    pillBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '11px 22px',
        borderRadius: '30px',
        backgroundColor: '#172236',
        border: '1px solid #2d3b55',
        color: '#cbd5e1',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.15s ease-in-out',
    },
    pillBtnActive: {
        backgroundColor: '#1e2c47',
        border: '2px solid #818cf8',
        color: '#ffffff',
        fontWeight: '600',
        boxShadow: '0 0 14px rgba(129, 140, 248, 0.25)',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #1f2b42',
        paddingTop: '24px',
    },
    skipBtn: {
        background: 'none',
        border: 'none',
        color: '#64748b',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        padding: '8px',
    },
    continueBtn: {
        backgroundColor: '#818cf8',
        color: '#0a0e17',
        border: 'none',
        borderRadius: '10px',
        padding: '12px 24px',
        fontSize: '14px',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    stepIndicator: {
        marginTop: '20px',
        fontSize: '13px',
        color: '#475569',
        fontWeight: '600',
    },
};