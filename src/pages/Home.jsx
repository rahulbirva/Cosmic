import React, { useState, useEffect, useRef } from 'react';

/* ─── Helpers ───────────────────────────────────────────────────────────── */
let _nid = 5;
const mkId = () => _nid++;
const TODAY = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const NOTE_COLORS = ['#6366F1', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EC4899'];

/* ─── AI ────────────────────────────────────────────────────────────────── */
const AI_MAP = [
    [['react','jsx','hook','component'], `**React** is a declarative UI library. Key concepts:\n\n- **Components** — isolated, reusable pieces of UI\n- **useState** — reactive local state\n- **useEffect** — side effects and lifecycle\n- **Props** — data flowing down from parent\n\nWhat would you like to dig into next?`],
    [['python','numpy','pandas','pytorch'], `**Python** is the standard for data science and AI.\n\n- **NumPy** — fast array operations\n- **Pandas** — dataframes and tabular data\n- **Scikit-learn** — classical ML algorithms\n- **PyTorch** — deep learning and neural nets\n\nAre you just starting or going deeper into one area?`],
    [['ai','ml','machine learning','neural','llm','gpt'], `**AI/ML** has a few main branches:\n\n- **Supervised learning** — predict from labeled examples\n- **Unsupervised learning** — find patterns in raw data\n- **Deep learning** — layered neural networks\n- **LLMs** — large language models like GPT or Gemini\n\nWant a study roadmap or a deep-dive on one of these?`],
    [['web','frontend','css','html','javascript','js'], `**Modern web dev** stack:\n\n1. **HTML + CSS** — structure and layout (Flexbox, Grid)\n2. **JavaScript** — logic and interactivity\n3. **React / Next.js** — component-based UI\n4. **TypeScript** — types and safety at scale\n5. **Vite** — fast dev tooling\n\nShould I suggest a learning order?`],
    [['interview','leetcode','dsa','algorithm'], `**Interview prep** broken down:\n\n**Core DSA**\n- Arrays, HashMaps, Strings\n- Trees, Graphs, Dynamic Programming\n- Practice 1–2 LeetCode problems daily\n\n**System Design**\n- Scalability, caching, databases\n- Study real-world architectures\n\n**Behavioral** — use the STAR method\n\nWant a 4-week plan?`],
    [['learn','start','beginner','roadmap','how do i'], `**How to actually learn fast:**\n\n1. Pick one thing and go deep, don't jump around\n2. Build something with every new concept\n3. 30 min daily beats a 4-hour weekend session\n4. Explain it out loud — teaching reveals gaps\n5. Review your notes every 3–4 days\n\nWhat are you trying to learn right now?`],
];
const FALLBACKS = [
    "Good question. The best approach is usually to go back to first principles — what's the core problem being solved here? Once that's clear, the implementation tends to follow naturally. Want to think through it together?",
    "That connects to a few things in your feed. The short answer: start with the simplest version that works, understand why it works, then build up from there. What part are you stuck on?",
    "Honestly, the most underrated learning technique is just building something with the concept the same day you learn it. Theory without practice fades fast. What's a small project you could apply this to?",
    "This is one of those areas where 80% of the value comes from 20% of the concepts. Focus on the fundamentals first — they compound. What's your current understanding of this topic?",
];
function getAI(q) {
    const lq = q.toLowerCase();
    for (const [keys, reply] of AI_MAP) {
        if (keys.some(k => lq.includes(k))) return reply;
    }
    return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

const SUGGESTIONS = [
    'How does React state work?',
    'Explain AI/ML for beginners',
    'Best way to learn Python?',
    'How to prep for interviews?',
    'CSS Grid vs Flexbox?',
    'What is a neural network?',
];

/* ─── Feed content ───────────────────────────────────────────────────────── */
const FEED_ARTICLES = [
    { id: 1, tag: 'AI / ML', readTime: '6 min', title: 'How Transformers Actually Work', desc: 'A bottom-up explanation of attention mechanisms — from matrix multiplication to why GPT can predict your next word.', accent: '#6366F1' },
    { id: 2, tag: 'Web Dev', readTime: '4 min', title: 'React 19: What Actually Changed', desc: 'The use() hook, server actions, and optimistic updates — a practical breakdown of what matters in the new release.', accent: '#8B5CF6' },
    { id: 3, tag: 'Design', readTime: '5 min', title: 'Why Your UI Looks Generic', desc: 'Specific design choices that separate polished products from template-looking ones. Spacing, hierarchy, and motion.', accent: '#06B6D4' },
    { id: 4, tag: 'Space', readTime: '3 min', title: 'JWST Just Rewrote Early Universe History', desc: 'New observations push galaxy formation back further than models predicted — what this means for cosmology.', accent: '#10B981' },
];

/* ─── Notes ─────────────────────────────────────────────────────────────── */
const INIT_NOTES = [
    { id: 1, title: 'AI Research Notes', preview: 'Transformers replaced recurrence with self-attention, enabling parallel processing...', body: `# AI Research Notes\n\nTransformers replaced recurrence with self-attention, enabling parallel processing.\n\n## Key Concepts\n- **Self-Attention:** each token attends to all others\n- **Positional Encoding:** sine/cosine order signals\n\n## Papers\n1. "Attention is All You Need" — Vaswani 2017\n2. BERT — Devlin et al.\n3. GPT-3 — Brown et al.`, tag: 'AI / ML', date: 'Aug 23', color: '#6366F1' },
    { id: 2, title: 'Web Dev Bookmarks', preview: 'React 19 ships the use() hook for async data...', body: `# Web Dev Bookmarks\n\nReact 19 ships the \`use()\` hook for async data.\n\n## New APIs\n- \`use(promise)\` — suspend until resolved\n- \`useOptimistic()\` — optimistic updates\n- \`useFormStatus()\` — form state without drilling`, tag: 'Web Dev', date: 'Aug 21', color: '#8B5CF6' },
    { id: 3, title: 'Design System', preview: 'Color, spacing, typography tokens...', body: `# Design System\n\n## Colors\n- Surface: #080B18\n- Border: rgba(255,255,255,0.09)\n- Accent: #6366F1\n\n## Typography\n- Sora — headlines\n- Geist — body`, tag: 'Design', date: 'Aug 20', color: '#06B6D4' },
    { id: 4, title: 'Space & Cosmos', preview: 'JWST reveals galaxies 300M years after Big Bang...', body: `# Space & Cosmos\n\nJWST reveals galaxies just 300M years post-Big Bang.\n\n## Discoveries\n- Cosmic Cliffs in Carina Nebula\n- WASP-96b: water vapor detected`, tag: 'Space', date: 'Aug 18', color: '#10B981' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   AI Chat
   ═══════════════════════════════════════════════════════════════════════════ */
function AIChat() {
    const [msgs, setMsgs] = useState([{
        id: 1, role: 'ai',
        text: "Hey! I'm your learning assistant.\n\nAsk me anything — concepts, roadmaps, explanations, or just where to start. I'm here to help you think, not just to answer.",
        time: '',
    }]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const endRef = useRef(null);
    const taRef = useRef(null);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

    const send = (text) => {
        const q = (text || input).trim();
        if (!q) return;
        setInput('');
        if (taRef.current) taRef.current.style.height = 'auto';
        const t = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setMsgs(p => [...p, { id: Date.now(), role: 'user', text: q, time: t }]);
        setTyping(true);
        setTimeout(() => {
            setMsgs(p => [...p, { id: Date.now() + 1, role: 'ai', text: getAI(q), time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
            setTyping(false);
        }, 700 + Math.random() * 700);
    };

    const renderText = (text) => text.split('\n').map((line, i) => {
        if (line.startsWith('## ')) return <div key={i} style={cs.h2}>{line.slice(3)}</div>;
        if (line.startsWith('# ')) return <div key={i} style={cs.h1}>{line.slice(2)}</div>;
        if (line.startsWith('- ')) return <div key={i} style={cs.li}>· {rb(line.slice(2))}</div>;
        if (line.match(/^\d+\. /)) return <div key={i} style={cs.li}>{rb(line)}</div>;
        if (!line.trim()) return <div key={i} style={{ height: '6px' }} />;
        return <div key={i} style={cs.p}>{rb(line)}</div>;
    });

    const rb = (line) => {
        const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
        return parts.map((p, j) => {
            if (p.startsWith('**') && p.endsWith('**')) return <strong key={j} style={{ color: '#E2E8F0', fontWeight: 600 }}>{p.slice(2, -2)}</strong>;
            if (p.startsWith('`') && p.endsWith('`')) return <code key={j} style={cs.inlineCode}>{p.slice(1, -1)}</code>;
            return p;
        });
    };

    return (
        <div style={cs.root}>
            {/* Header */}
            <div style={cs.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <div style={cs.aiDot} />
                    <span style={cs.headerTitle}>Ask AI</span>
                </div>
                <span style={cs.headerHint}>Press Enter to send</span>
            </div>

            {/* Messages */}
            <div style={cs.messages}>
                {msgs.map(m => (
                    <div key={m.id} style={{
                        ...cs.msgWrap,
                        flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                    }}>
                        {m.role === 'ai' && <div style={cs.aiAvatar}>AI</div>}
                        <div style={{ maxWidth: '82%' }}>
                            <div style={{
                                ...cs.bubble,
                                ...(m.role === 'user' ? cs.userBubble : cs.aiBubble),
                            }}>
                                {renderText(m.text)}
                            </div>
                            {m.time && (
                                <div style={{ ...cs.msgTime, textAlign: m.role === 'user' ? 'right' : 'left' }}>
                                    {m.time}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {typing && (
                    <div style={{ ...cs.msgWrap, flexDirection: 'row' }}>
                        <div style={cs.aiAvatar}>AI</div>
                        <div style={{ ...cs.bubble, ...cs.aiBubble, padding: '12px 15px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <span style={cs.tdot} /><span style={{ ...cs.tdot, animationDelay: '0.15s' }} /><span style={{ ...cs.tdot, animationDelay: '0.3s' }} />
                        </div>
                    </div>
                )}
                <div ref={endRef} />
            </div>

            {/* Suggestions — shown only initially */}
            {msgs.length <= 1 && (
                <div style={cs.suggestArea}>
                    <div style={cs.sugGrid}>
                        {SUGGESTIONS.map(q => (
                            <button key={q} type="button" style={cs.sugChip} onClick={() => send(q)}>{q}</button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div style={cs.inputWrap}>
                <textarea
                    ref={taRef}
                    style={cs.input}
                    placeholder="Ask anything..."
                    value={input}
                    rows={1}
                    disabled={typing}
                    onChange={e => {
                        setInput(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                    }}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                />
                <button type="button" style={{ ...cs.sendBtn, opacity: input.trim() && !typing ? 1 : 0.35, cursor: input.trim() && !typing ? 'pointer' : 'default' }}
                    onClick={send} disabled={!input.trim() || typing}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Feed Card
   ═══════════════════════════════════════════════════════════════════════════ */
function FeedCard({ article }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            style={{
                ...ps.card,
                borderColor: hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
                background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={ps.cardTop}>
                <span style={{ ...ps.cardTag, color: article.accent, borderColor: article.accent + '35', background: article.accent + '10' }}>
                    {article.tag}
                </span>
                <span style={ps.cardRead}>{article.readTime} read</span>
            </div>
            <h3 style={ps.cardTitle}>{article.title}</h3>
            <p style={ps.cardDesc}>{article.desc}</p>
            <button type="button" style={ps.cardBtn}>Read →</button>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Home
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
    const [tab, setTab] = useState('My Feed');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notes, setNotes] = useState(INIT_NOTES);
    const [activeNote, setActiveNote] = useState(null);
    const [noteBody, setNoteBody] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [editing, setEditing] = useState(false);
    const [delConfirm, setDelConfirm] = useState(null);
    const titleRef = useRef(null);

    useEffect(() => {
        if (activeNote) { setNoteBody(activeNote.body); setNoteTitle(activeNote.title); }
    }, [activeNote?.id]);

    useEffect(() => {
        const fn = e => { if (e.key === 'Escape') { if (activeNote) saveBack(); else setDrawerOpen(false); } };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [activeNote, noteBody, noteTitle]);

    useEffect(() => { if (editing && titleRef.current) titleRef.current.focus(); }, [editing]);

    const openNote = n => { setActiveNote(n); setEditing(false); setDelConfirm(null); };
    const saveBack = () => {
        if (activeNote) {
            const t = noteTitle.trim() || 'Untitled';
            const pv = noteBody.replace(/#+\s/g, '').replace(/\*\*/g, '').split('\n').find(l => l.trim()) || '';
            setNotes(p => p.map(n => n.id === activeNote.id ? { ...n, title: t, body: noteBody, preview: pv.slice(0, 80) + (pv.length > 80 ? '...' : ''), date: TODAY } : n));
        }
        setActiveNote(null); setEditing(false); setDelConfirm(null);
    };
    const newNote = () => {
        const c = NOTE_COLORS[notes.length % NOTE_COLORS.length];
        const n = { id: mkId(), title: 'Untitled', preview: '', body: '', tag: 'Note', date: TODAY, color: c };
        setNotes(p => [n, ...p]);
        setActiveNote(n); setNoteBody(''); setNoteTitle('Untitled'); setEditing(true);
    };
    const delNote = id => {
        setNotes(p => p.filter(n => n.id !== id));
        if (activeNote?.id === id) { setActiveNote(null); setEditing(false); }
        setDelConfirm(null);
    };

    return (
        <div style={ps.page}>
            {/* ── Navbar ── */}
            <header style={ps.nav}>
                <div style={ps.navLeft}>
                    <div style={ps.logo}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span style={ps.logoText}>MindVault</span>
                </div>

                <nav style={ps.navCenter}>
                    {['My Feed', 'Discovery'].map(t => (
                        <button key={t} type="button" onClick={() => setTab(t)}
                            style={{ ...ps.navTab, color: tab === t ? '#E2E8F0' : '#64748B' }}>
                            {t}
                            {tab === t && <span style={ps.navUnderline} />}
                        </button>
                    ))}
                </nav>

                <div style={ps.navRight}>
                    <button type="button" onClick={() => setDrawerOpen(v => !v)}
                        style={{ ...ps.navIconBtn, backgroundColor: drawerOpen ? 'rgba(99,102,241,0.1)' : 'transparent' }}
                        title="Notes">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke={drawerOpen ? '#818CF8' : '#64748B'}
                            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                    </button>
                    <div style={ps.avatar}>AM</div>
                </div>
            </header>

            {/* ── Body ── */}
            <div style={{ position: 'relative', minHeight: 'calc(100vh - 56px)' }}>
                <main style={{
                    maxWidth: '1160px', margin: '0 auto',
                    padding: '28px 24px',
                    paddingRight: drawerOpen ? 'calc(25vw + 24px)' : '24px',
                    transition: 'padding-right 0.3s ease',
                    position: 'relative', zIndex: 1,
                }}>

                    {/* MY FEED */}
                    {tab === 'My Feed' && (
                        <div style={ps.feedLayout} className="anim-fadeUp">
                            {/* Left — articles */}
                            <div style={ps.feedMain}>
                                <div style={ps.feedMeta}>
                                    <h1 style={ps.pageTitle}>My Feed</h1>
                                    <div style={ps.feedTopics}>
                                        {['AI / ML', 'Web Dev', 'Design', 'Space'].map(l => (
                                            <span key={l} style={ps.topicTag}>{l}</span>
                                        ))}
                                    </div>
                                </div>
                                <div style={ps.articleList}>
                                    {FEED_ARTICLES.map(a => <FeedCard key={a.id} article={a} />)}
                                </div>
                            </div>

                            {/* Right — AI chat */}
                            <div style={ps.chatCol}>
                                <AIChat />
                            </div>
                        </div>
                    )}

                    {/* DISCOVERY */}
                    {tab === 'Discovery' && (
                        <div className="anim-fadeUp">
                            <div style={ps.feedMeta}>
                                <h1 style={ps.pageTitle}>Discovery</h1>
                                <p style={ps.pageSub}>Weekly random deep-dives to expand your perspective.</p>
                            </div>
                            <div style={ps.articleList}>
                                {[
                                    { id: 5, tag: 'Neuroscience', readTime: '7 min', title: 'How Memory Actually Forms in the Brain', desc: 'LTP, hippocampal consolidation, and why spaced repetition works — the neuroscience behind learning.', accent: '#EC4899' },
                                    { id: 6, tag: 'Quantum', readTime: '5 min', title: `Quantum Entanglement Isn't Telepathy`, desc: 'What entanglement actually does and does not allow — a clear-headed look at the most misunderstood concept in physics.', accent: '#F59E0B' },
                                    { id: 7, tag: 'Robotics', readTime: '6 min', title: 'The Problem With Humanoid Robots', desc: 'Why walking on two legs is unsolved, what Boston Dynamics actually did, and what comes next.', accent: '#10B981' },
                                ].map(a => <FeedCard key={a.id} article={a} />)}
                            </div>
                        </div>
                    )}
                </main>

                {/* ── Notes Drawer ── */}
                <aside style={{ ...ps.drawer, transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                    {/* Header */}
                    <div style={ps.drawerHead}>
                        {activeNote ? (
                            <div style={ps.drawerRow}>
                                <button type="button" onClick={saveBack} style={ps.backBtn}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                    Notes
                                </button>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    {delConfirm === activeNote.id ? (
                                        <div style={ps.confirmRow}>
                                            <span style={ps.confirmTxt}>Delete?</span>
                                            <button type="button" style={ps.confirmYes} onClick={() => delNote(activeNote.id)}>Yes</button>
                                            <button type="button" style={ps.confirmNo} onClick={() => setDelConfirm(null)}>No</button>
                                        </div>
                                    ) : (
                                        <button type="button" style={ps.iconAction} onClick={() => setDelConfirm(activeNote.id)} title="Delete">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                                            </svg>
                                        </button>
                                    )}
                                    <button type="button"
                                        style={{ ...ps.editToggle, ...(editing ? ps.editToggleOn : {}) }}
                                        onClick={() => setEditing(v => !v)}>
                                        {editing ? 'Done' : 'Edit'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={ps.drawerRow}>
                                <span style={ps.drawerTitle}>Notes</span>
                                <button type="button" style={ps.newBtn} onClick={newNote}>New</button>
                            </div>
                        )}
                    </div>

                    {/* List */}
                    {!activeNote && (
                        <div style={ps.noteList}>
                            {notes.length === 0 && (
                                <div style={ps.empty}>
                                    <p style={ps.emptyTxt}>No notes yet.</p>
                                    <button type="button" style={ps.emptyBtn} onClick={newNote}>Create one</button>
                                </div>
                            )}
                            {notes.map(n => (
                                <div key={n.id} style={ps.noteRow}>
                                    <button type="button" onClick={() => openNote(n)} style={ps.noteBtn}>
                                        <span style={{ ...ps.stripe, backgroundColor: n.color }} />
                                        <div style={ps.noteInfo}>
                                            <div style={ps.noteHeader}>
                                                <span style={ps.noteTitle}>{n.title}</span>
                                                <span style={ps.noteDate}>{n.date}</span>
                                            </div>
                                            <p style={ps.notePreview}>{n.preview || 'Empty note'}</p>
                                        </div>
                                    </button>
                                    {delConfirm === n.id ? (
                                        <div style={{ ...ps.confirmRow, paddingRight: '10px' }}>
                                            <button type="button" style={ps.confirmYes} onClick={() => delNote(n.id)}>Del</button>
                                            <button type="button" style={ps.confirmNo} onClick={() => setDelConfirm(null)}>No</button>
                                        </div>
                                    ) : (
                                        <button type="button" style={ps.rowDel} onClick={() => setDelConfirm(n.id)}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Detail */}
                    {activeNote && (
                        <div style={ps.noteDetail}>
                            <div style={ps.noteMeta}>
                                <span style={{ ...ps.noteTagPill, color: activeNote.color, borderColor: activeNote.color + '40' }}>{activeNote.tag}</span>
                                <span style={ps.noteDate}>{activeNote.date}</span>
                            </div>
                            {editing
                                ? <input ref={titleRef} style={ps.titleInput} value={noteTitle} onChange={e => setNoteTitle(e.target.value)} placeholder="Title" />
                                : <h2 style={ps.titleView}>{noteTitle || 'Untitled'}</h2>
                            }
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '14px 0' }} />
                            {editing
                                ? <textarea style={ps.noteEditor} value={noteBody} onChange={e => setNoteBody(e.target.value)} placeholder={'Start writing...\n\n# Heading\n## Sub\n- bullet\n**bold**'} spellCheck={false} />
                                : <div style={ps.noteBody}>
                                    {noteBody.split('\n').map((line, i) => {
                                        if (line.startsWith('## ')) return <h3 key={i} style={ps.mdH2}>{line.slice(3)}</h3>;
                                        if (line.startsWith('# ')) return <h2 key={i} style={ps.mdH1}>{line.slice(2)}</h2>;
                                        if (line.startsWith('- ')) return <div key={i} style={ps.mdLi}>· {line.slice(2)}</div>;
                                        if (line.match(/^\d+\. /)) return <div key={i} style={ps.mdLi}>{line}</div>;
                                        if (!line.trim()) return <div key={i} style={{ height: '8px' }} />;
                                        const p = line.split(/\*\*(.*?)\*\*/g);
                                        return <p key={i} style={ps.mdP}>{p.map((x, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#E2E8F0' }}>{x}</strong> : x)}</p>;
                                    })}
                                    {!noteBody && <p style={{ ...ps.mdP, fontStyle: 'italic', color: '#334155' }}>Empty — tap Edit to start writing.</p>}
                                </div>
                            }
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const ps = {
    page: { minHeight: '100vh', color: '#E2E8F0', fontFamily: "'Geist','Inter',sans-serif" },

    /* Nav */
    nav: { display: 'flex', alignItems: 'center', padding: '0 20px', height: '56px', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'sticky', top: 0, zIndex: 200, background: 'rgba(8,11,24,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' },
    navLeft: { display: 'flex', alignItems: 'center', gap: '8px', flex: '0 0 auto' },
    logo: { width: '26px', height: '26px', borderRadius: '6px', background: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    logoText: { fontFamily: "'Sora',sans-serif", fontWeight: '700', fontSize: '13px', letterSpacing: '0.04em', color: '#E2E8F0' },
    navCenter: { display: 'flex', gap: '2px', flex: 1, justifyContent: 'center' },
    navTab: { background: 'none', border: 'none', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 16px', borderRadius: '6px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', transition: 'color 0.15s', fontFamily: "'Geist',sans-serif" },
    navUnderline: { position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '16px', height: '1.5px', backgroundColor: '#6366F1', borderRadius: '99px' },
    navRight: { display: 'flex', alignItems: 'center', gap: '6px', flex: '0 0 auto' },
    navIconBtn: { padding: '5px 7px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', border: 'none', transition: 'background-color 0.15s' },
    avatar: { width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#818CF8', fontFamily: "'Geist',sans-serif" },

    /* Feed */
    feedLayout: { display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px', alignItems: 'start' },
    feedMain: { display: 'flex', flexDirection: 'column', gap: '20px' },
    feedMeta: { display: 'flex', flexDirection: 'column', gap: '10px' },
    pageTitle: { fontFamily: "'Sora',sans-serif", fontSize: '20px', fontWeight: '700', color: '#E2E8F0', letterSpacing: '-0.01em' },
    pageSub: { fontSize: '13px', color: '#475569', marginTop: '2px' },
    feedTopics: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
    topicTag: { fontSize: '11px', fontWeight: '500', padding: '3px 10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B', fontFamily: "'Geist',sans-serif" },
    articleList: { display: 'flex', flexDirection: 'column', gap: '1px' },
    chatCol: { position: 'sticky', top: '72px', height: 'calc(100vh - 88px)' },

    /* Article card */
    card: { padding: '16px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' },
    cardTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    cardTag: { fontSize: '10px', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '4px', border: '1px solid', fontFamily: "'Geist',sans-serif" },
    cardRead: { fontSize: '11px', color: '#334155', fontFamily: "'Geist',sans-serif" },
    cardTitle: { fontFamily: "'Sora',sans-serif", fontSize: '15px', fontWeight: '600', color: '#E2E8F0', lineHeight: '1.35', letterSpacing: '-0.01em' },
    cardDesc: { fontSize: '13px', color: '#64748B', lineHeight: '1.55' },
    cardBtn: { alignSelf: 'flex-start', background: 'none', border: 'none', color: '#6366F1', fontSize: '12px', fontWeight: '600', cursor: 'pointer', padding: 0, fontFamily: "'Geist',sans-serif" },

    /* Drawer */
    drawer: { position: 'fixed', top: '56px', right: 0, width: '25vw', minWidth: '280px', maxWidth: '360px', height: 'calc(100vh - 56px)', background: '#0B0E1C', borderLeft: '1px solid rgba(255,255,255,0.07)', zIndex: 150, display: 'flex', flexDirection: 'column', transition: 'transform 0.28s ease', overflow: 'hidden' },
    drawerHead: { padding: '14px 14px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 },
    drawerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    drawerTitle: { fontFamily: "'Sora',sans-serif", fontWeight: '600', fontSize: '13px', color: '#E2E8F0' },
    newBtn: { background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#818CF8', borderRadius: '5px', padding: '4px 11px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Geist',sans-serif" },
    backBtn: { display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#475569', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Geist',sans-serif" },
    editToggle: { background: 'transparent', border: '1px solid rgba(255,255,255,0.09)', color: '#475569', borderRadius: '5px', padding: '3px 11px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Geist',sans-serif", transition: 'all 0.15s' },
    editToggleOn: { background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.3)', color: '#818CF8' },
    iconAction: { background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', color: '#475569', borderRadius: '5px', padding: '4px 7px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
    confirmRow: { display: 'flex', alignItems: 'center', gap: '5px' },
    confirmTxt: { fontSize: '11px', color: '#475569', fontFamily: "'Geist',sans-serif" },
    confirmYes: { background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#F87171', borderRadius: '4px', padding: '3px 9px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Geist',sans-serif" },
    confirmNo: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569', borderRadius: '4px', padding: '3px 9px', fontSize: '11px', cursor: 'pointer', fontFamily: "'Geist',sans-serif" },
    noteList: { display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1 },
    noteRow: { display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingRight: '6px' },
    noteBtn: { display: 'flex', alignItems: 'center', flex: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '11px 6px 11px 12px', textAlign: 'left', color: 'inherit', minWidth: 0 },
    rowDel: { flexShrink: 0, background: 'none', border: 'none', color: '#1E293B', cursor: 'pointer', padding: '5px', borderRadius: '4px', transition: 'color 0.15s', display: 'flex' },
    stripe: { width: '2px', minWidth: '2px', height: '36px', borderRadius: '2px', marginRight: '10px', flexShrink: 0 },
    noteInfo: { flex: 1, minWidth: 0 },
    noteHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' },
    noteTitle: { fontFamily: "'Geist',sans-serif", fontSize: '13px', fontWeight: '600', color: '#CBD5E1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '72%' },
    noteDate: { fontSize: '10px', color: '#1E293B', flexShrink: 0 },
    notePreview: { fontSize: '12px', color: '#334155', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    empty: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', gap: '10px' },
    emptyTxt: { fontSize: '13px', color: '#334155', fontFamily: "'Geist',sans-serif" },
    emptyBtn: { background: 'none', border: '1px solid rgba(99,102,241,0.25)', color: '#6366F1', borderRadius: '6px', padding: '8px 16px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Geist',sans-serif" },
    noteDetail: { flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', overflowY: 'auto' },
    noteMeta: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' },
    noteTagPill: { fontSize: '10px', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: '4px', border: '1px solid', fontFamily: "'Geist',sans-serif" },
    titleView: { fontFamily: "'Sora',sans-serif", fontSize: '16px', fontWeight: '700', color: '#E2E8F0', lineHeight: '1.3' },
    titleInput: { width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(99,102,241,0.35)', color: '#E2E8F0', fontSize: '16px', fontWeight: '700', fontFamily: "'Sora',sans-serif", padding: '3px 0', outline: 'none' },
    noteEditor: { flex: 1, width: '100%', minHeight: '320px', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '11px', color: '#E2E8F0', fontSize: '13px', lineHeight: '1.7', fontFamily: "'Geist',sans-serif", outline: 'none', resize: 'none' },
    noteBody: { flex: 1, overflowY: 'auto' },
    mdH1: { fontFamily: "'Sora',sans-serif", fontSize: '15px', fontWeight: '700', color: '#E2E8F0', marginBottom: '7px', marginTop: '4px' },
    mdH2: { fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: '600', color: '#94A3B8', marginBottom: '5px', marginTop: '14px' },
    mdP: { fontSize: '13px', color: '#64748B', lineHeight: '1.7', marginBottom: '2px' },
    mdLi: { fontSize: '13px', color: '#64748B', lineHeight: '1.7', paddingLeft: '8px', marginBottom: '2px' },
};

/* ─── Chat styles ─────────────────────────────────────────────────────────── */
const cs = {
    root: { display: 'flex', flexDirection: 'column', height: '100%', background: 'rgba(11,14,28,0.9)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' },
    header: { padding: '11px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    aiDot: { width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' },
    headerTitle: { fontFamily: "'Geist',sans-serif", fontSize: '13px', fontWeight: '600', color: '#94A3B8' },
    headerHint: { fontSize: '11px', color: '#1E293B', fontFamily: "'Geist',sans-serif" },
    messages: { flex: 1, overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: '12px' },
    msgWrap: { display: 'flex', alignItems: 'flex-end', gap: '7px' },
    aiAvatar: { width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: '700', color: '#6366F1', fontFamily: "'Geist',sans-serif", marginBottom: '16px', letterSpacing: '0.02em' },
    bubble: { padding: '10px 13px', borderRadius: '10px', lineHeight: '1.5' },
    aiBubble: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderBottomLeftRadius: '3px' },
    userBubble: { background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.22)', borderBottomRightRadius: '3px' },
    msgTime: { fontSize: '10px', color: '#1E293B', marginTop: '4px', fontFamily: "'Geist',sans-serif", paddingLeft: '2px', paddingRight: '2px' },
    tdot: { display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: '#334155', animation: 'typing-bounce 1s ease-in-out infinite' },
    h1: { fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: '700', color: '#E2E8F0', marginBottom: '5px' },
    h2: { fontFamily: "'Sora',sans-serif", fontSize: '12px', fontWeight: '600', color: '#94A3B8', marginBottom: '4px', marginTop: '10px' },
    p: { fontSize: '13px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '2px' },
    li: { fontSize: '13px', color: '#94A3B8', lineHeight: '1.6', paddingLeft: '6px', marginBottom: '2px' },
    inlineCode: { background: 'rgba(99,102,241,0.12)', color: '#A5B4FC', padding: '1px 5px', borderRadius: '3px', fontSize: '12px', fontFamily: "'Geist',sans-serif" },
    suggestArea: { padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 },
    sugGrid: { display: 'flex', flexWrap: 'wrap', gap: '5px' },
    sugChip: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569', borderRadius: '5px', padding: '4px 10px', fontSize: '11px', cursor: 'pointer', fontFamily: "'Geist',sans-serif", whiteSpace: 'nowrap', transition: 'border-color 0.15s' },
    inputWrap: { display: 'flex', alignItems: 'flex-end', gap: '7px', padding: '9px 12px', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(8,11,24,0.95)', flexShrink: 0 },
    input: { flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '7px', padding: '8px 12px', color: '#E2E8F0', fontSize: '13px', lineHeight: '1.5', fontFamily: "'Geist',sans-serif", outline: 'none', resize: 'none', maxHeight: '100px' },
    sendBtn: { width: '30px', height: '30px', borderRadius: '7px', flexShrink: 0, background: '#6366F1', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.15s' },
};

if (typeof document !== 'undefined' && !document.getElementById('mv-anim')) {
    const st = document.createElement('style'); st.id = 'mv-anim';
    st.textContent = `@keyframes typing-bounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}`;
    document.head.appendChild(st);
}