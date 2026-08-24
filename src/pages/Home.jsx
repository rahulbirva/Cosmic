import React, { useState } from 'react';

export default function Home({ onNavigateToDiary }) {
    const [activeTab, setActiveTab] = useState('Careers');

    const jobs = [
        {
            id: 1,
            title: 'Senior Product Manager',
            company: 'FinFlow',
            stage: 'Series B',
            location: 'Remote',
            posted: '2d ago',
            match: 94,
            desc: 'Lead the development of our core payment routing engine. You will work cross-functionally with engineering and data science to optimize transaction success rates and expand our global footprint.',
            tags: ['Payment Systems', 'Data Analysis', 'Agile'],
            gap: 'API Design'
        },
        {
            id: 2,
            title: 'Growth Marketing Lead',
            company: 'VitalityOS',
            stage: 'Series A',
            location: 'San Francisco / Hybrid',
            posted: '5h ago',
            match: 88,
            desc: 'Drive user acquisition and retention for our flagship health monitoring app. You will manage a multi-channel budget and work closely with product to build virality loops into the core user experience.',
            tags: ['User Acquisition', 'A/B Testing'],
            gap: 'SEO Strategy'
        },
        {
            id: 3,
            title: 'Data Scientist - NLP',
            company: 'Cognition Labs',
            stage: 'Seed',
            location: 'Remote',
            posted: '1d ago',
            match: 72,
            desc: 'Fine-tune domain-specific LLMs and build custom evaluation harnesses for agentic workflows and automated synthesis pipelines.',
            tags: ['Python', 'PyTorch', 'Transformers'],
            gap: 'Vector Databases'
        }
    ];

    return (
        <div style={styles.pageWrapper}>
            {/* Top Navbar */}
            <header style={styles.navbar}>
                <div style={styles.brandContainer}>
                    <div style={styles.logoBox}>MV</div>
                    <span style={styles.brandName}>MINDVAULT</span>
                </div>

                {/* Center Tabs */}
                <nav style={styles.navTabs}>
                    {['My Feed', 'Discovery', 'Careers'].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            style={{
                                ...styles.navTabBtn,
                                ...(activeTab === tab ? styles.navTabActive : {})
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                {/* Right Section: Diary icon + User Avatar */}
                <div style={styles.navRight}>
                    <button
                        type="button"
                        title="Open Diary"
                        onClick={onNavigateToDiary}
                        style={styles.diaryIconBtn}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                    </button>
                    <div style={styles.avatar}>
                        <span>AM</span>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main style={styles.mainContainer}>
                {activeTab === 'Careers' && (
                    <div style={styles.layoutGrid}>
                        {/* Left Column: Recommended Roles */}
                        <section style={styles.leftColumn}>
                            <h1 style={styles.sectionHeading}>Recommended Roles</h1>
                            <p style={styles.sectionSub}>
                                Based on your learning history and current skill profile, we've identified these high-match opportunities in hyper-growth startups.
                            </p>

                            {/* Filter Pills */}
                            <div style={styles.filterRow}>
                                <button style={{ ...styles.filterPill, ...styles.filterPillActive }}>All Matches</button>
                                <button style={styles.filterPill}>Product Management</button>
                                <button style={styles.filterPill}>Growth Marketing</button>
                                <button style={styles.filterPill}>Remote</button>
                                <button style={styles.filterPill}>⚡ Filters</button>
                            </div>

                            {/* Job Cards */}
                            <div style={styles.jobList}>
                                {jobs.map((job) => (
                                    <div key={job.id} style={styles.jobCard}>
                                        <div style={styles.jobHeader}>
                                            <div>
                                                <h2 style={styles.jobTitle}>{job.title}</h2>
                                                <div style={styles.jobMeta}>
                                                    {job.company} • {job.stage} • {job.location}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={styles.matchBadge}>
                                                    ✓ {job.match}% Match
                                                </span>
                                                <div style={styles.postedTime}>{job.posted}</div>
                                            </div>
                                        </div>

                                        <p style={styles.jobDesc}>{job.desc}</p>

                                        {/* Tags & Skill Gaps */}
                                        <div style={styles.tagRow}>
                                            {job.tags.map((tag) => (
                                                <span key={tag} style={styles.skillTag}>{tag}</span>
                                            ))}
                                            <span style={styles.gapTag}>⚡ Gap: {job.gap}</span>
                                        </div>

                                        {/* Card Actions */}
                                        <div style={styles.cardFooter}>
                                            <span style={styles.applicantText}>🔥 3 applicants saved</span>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button type="button" style={styles.secondaryBtn}>View Details</button>
                                                <button type="button" style={styles.primaryBtn}>Apply Now</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Right Column: Widgets */}
                        <aside style={styles.rightColumn}>
                            {/* Profile Strength Card */}
                            <div style={styles.widgetCard}>
                                <h3 style={styles.widgetTitle}>Profile Strength</h3>

                                {/* Circular Score Visual */}
                                <div style={styles.circleContainer}>
                                    <div style={styles.circleGraphic}>
                                        <span style={styles.circlePercent}>85%</span>
                                    </div>
                                </div>

                                <p style={styles.widgetSub}>
                                    Complete your profile to increase your match accuracy with top employers.
                                </p>

                                <div style={styles.checklist}>
                                    <div style={styles.checkItemDone}>✓ Add Resume</div>
                                    <div style={styles.checkItemDone}>✓ Connect LinkedIn</div>
                                    <div style={styles.checkItemTodo}>○ Add Portfolio Link <span style={styles.bonusBadge}>+10%</span></div>
                                </div>

                                <button type="button" style={styles.completeProfileBtn}>Complete Profile</button>
                            </div>

                            {/* Skill Gap Analysis Card */}
                            <div style={styles.widgetCard}>
                                <h3 style={styles.widgetTitle}>Skill Gap Analysis</h3>
                                <p style={styles.widgetSub}>
                                    Trending skills required for your target roles that you haven't mastered yet.
                                </p>

                                <div style={styles.gapList}>
                                    <div style={styles.gapRow}>
                                        <span style={styles.gapName}>SQL / Data Modeling</span>
                                        <span style={styles.priorityHigh}>High Priority</span>
                                    </div>
                                    <div style={styles.gapRow}>
                                        <span style={styles.gapName}>API Design</span>
                                        <span style={styles.priorityMedium}>Medium</span>
                                    </div>
                                </div>

                                <button type="button" style={styles.exploreLink}>
                                    Explore suggested topics →
                                </button>
                            </div>
                        </aside>
                    </div>
                )}

                {activeTab === 'My Feed' && (
                    <div style={styles.placeholderTab}>
                        <h2>My Feed</h2>
                        <p style={{ color: '#94a3b8', marginTop: '8px' }}>
                            Your distraction-free video and article feed is being curated based on your selected interests.
                        </p>
                    </div>
                )}

                {activeTab === 'Discovery' && (
                    <div style={styles.placeholderTab}>
                        <h2>Weekly Discovery</h2>
                        <p style={{ color: '#94a3b8', marginTop: '8px' }}>
                            Explore surprise random topics in space, tech, and science tailored to expand your mind.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}

const styles = {
    pageWrapper: {
        minHeight: '100vh',
        backgroundColor: '#0a0f1d',
        color: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 32px',
        backgroundColor: '#0c1322',
        borderBottom: '1px solid #1e293b',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logoBox: {
        backgroundColor: '#ffffff',
        color: '#0a0f1d',
        fontWeight: '800',
        fontSize: '13px',
        padding: '4px 6px',
        borderRadius: '4px',
        letterSpacing: '-0.5px',
    },
    brandName: {
        fontWeight: '800',
        fontSize: '14px',
        letterSpacing: '1px',
        color: '#ffffff',
    },
    navTabs: {
        display: 'flex',
        gap: '28px',
    },
    navTabBtn: {
        background: 'none',
        border: 'none',
        color: '#94a3b8',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        padding: '6px 0',
    },
    navTabActive: {
        color: '#ffffff',
        borderBottom: '2px solid #6366f1',
    },
    navRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    diaryIconBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: '700',
        color: '#cbd5e1',
    },
    mainContainer: {
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '32px 24px',
    },
    layoutGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '32px',
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    sectionHeading: {
        fontSize: '28px',
        fontWeight: '800',
        color: '#ffffff',
        margin: '0 0 8px 0',
    },
    sectionSub: {
        fontSize: '14px',
        color: '#94a3b8',
        margin: '0 0 20px 0',
        lineHeight: '1.5',
    },
    filterRow: {
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap',
    },
    filterPill: {
        backgroundColor: '#131d31',
        border: '1px solid #1e293b',
        color: '#94a3b8',
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
    },
    filterPillActive: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        borderColor: '#3b82f6',
    },
    jobList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
    },
    jobCard: {
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '24px',
    },
    jobHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px',
    },
    jobTitle: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#ffffff',
        margin: '0 0 4px 0',
    },
    jobMeta: {
        fontSize: '13px',
        color: '#64748b',
    },
    matchBadge: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#34d399',
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        padding: '4px 10px',
        borderRadius: '12px',
        display: 'inline-block',
    },
    postedTime: {
        fontSize: '11px',
        color: '#64748b',
        marginTop: '4px',
    },
    jobDesc: {
        fontSize: '13px',
        color: '#94a3b8',
        lineHeight: '1.5',
        marginBottom: '16px',
    },
    tagRow: {
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '20px',
    },
    skillTag: {
        backgroundColor: '#1e293b',
        color: '#cbd5e1',
        fontSize: '11px',
        padding: '4px 10px',
        borderRadius: '6px',
        fontWeight: '500',
    },
    gapTag: {
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        color: '#fbbf24',
        fontSize: '11px',
        padding: '4px 10px',
        borderRadius: '6px',
        fontWeight: '600',
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #1e293b',
        paddingTop: '16px',
    },
    applicantText: {
        fontSize: '12px',
        color: '#64748b',
    },
    secondaryBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#cbd5e1',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        padding: '8px 12px',
    },
    primaryBtn: {
        backgroundColor: '#3b82f6',
        border: 'none',
        color: '#ffffff',
        fontSize: '13px',
        fontWeight: '600',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
    },
    rightColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    widgetCard: {
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '24px',
    },
    widgetTitle: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '8px',
    },
    widgetSub: {
        fontSize: '12px',
        color: '#64748b',
        lineHeight: '1.4',
        marginBottom: '16px',
    },
    circleContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '16px 0',
    },
    circleGraphic: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '6px solid #3b82f6',
        borderTopColor: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circlePercent: {
        fontSize: '22px',
        fontWeight: '800',
        color: '#ffffff',
    },
    checklist: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontSize: '12px',
        color: '#94a3b8',
        marginBottom: '20px',
    },
    checkItemDone: {
        color: '#34d399',
    },
    checkItemTodo: {
        color: '#cbd5e1',
        display: 'flex',
        justifyContent: 'space-between',
    },
    bonusBadge: {
        color: '#3b82f6',
        fontWeight: '700',
    },
    completeProfileBtn: {
        width: '100%',
        backgroundColor: '#1e293b',
        color: '#cbd5e1',
        border: '1px solid #334155',
        padding: '10px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
    },
    gapList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '16px',
    },
    gapRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '13px',
    },
    gapName: {
        color: '#cbd5e1',
    },
    priorityHigh: {
        color: '#f87171',
        fontSize: '12px',
    },
    priorityMedium: {
        color: '#fbbf24',
        fontSize: '12px',
    },
    exploreLink: {
        background: 'none',
        border: 'none',
        color: '#3b82f6',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        padding: 0,
    },
    placeholderTab: {
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
    }
};