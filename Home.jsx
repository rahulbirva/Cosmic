import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', color: 'white', padding: '40px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1>My Growth Hub</h1>
        <button onClick={() => navigate('/diary')} style={{ padding: '10px 20px', backgroundColor: '#1f6feb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Open My Diary
        </button>
      </div>

      {/* Main Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        
        {/* LEFT COLUMN: Feature 1 - Learning Feed */}
        <div style={{ backgroundColor: '#161b22', padding: '20px', borderRadius: '10px', border: '1px solid #30363d' }}>
          <h3>Targeted Learning</h3>
          <p style={{ color: '#8b949e', marginBottom: '20px' }}>Based on your interest in Web Development</p>
          
          {/* Dummy YouTube Embed */}
          <div style={{ width: '100%', height: '315px', backgroundColor: '#000', marginBottom: '15px', borderRadius: '5px', overflow: 'hidden' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/bMknfKXIFA8" title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
          </div>
          
          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ padding: '10px 15px', backgroundColor: '#8957e5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>✨ Simplify Video</button>
            <button style={{ padding: '10px 15px', backgroundColor: '#21262d', color: 'white', border: '1px solid #30363d', borderRadius: '5px', cursor: 'pointer' }}>💾 Add to Diary</button>
          </div>
        </div>

        {/* RIGHT COLUMN: Features 2 & 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Feature 2: Random Knowledge Card */}
          <div style={{ backgroundColor: '#161b22', padding: '20px', borderRadius: '10px', border: '1px solid #30363d' }}>
            <h3 style={{ color: '#e3b341' }}>Weekly Discovery</h3>
            <h4 style={{ marginTop: '10px' }}>The Fermi Paradox</h4>
            <p style={{ color: '#c9d1d9', fontSize: '14px', marginTop: '10px', lineHeight: '1.5' }}>
              If the universe is so vast and old, where are all the aliens? The Fermi Paradox highlights the contradiction between the high probability of extraterrestrial life and the lack of evidence for it.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button style={{ padding: '8px', backgroundColor: 'transparent', color: '#f85149', border: '1px solid #f85149', borderRadius: '5px', cursor: 'pointer' }}>❤️ Like</button>
              <button style={{ padding: '8px', backgroundColor: '#21262d', color: 'white', border: '1px solid #30363d', borderRadius: '5px', cursor: 'pointer' }}>Save Fact</button>
            </div>
          </div>

          {/* Feature 3: Job Matcher */}
          <div style={{ backgroundColor: '#161b22', padding: '20px', borderRadius: '10px', border: '1px solid #30363d' }}>
            <h3>Career Matcher</h3>
            <p style={{ color: '#8b949e', fontSize: '13px', marginBottom: '15px' }}>Based on your uploaded Resume</p>
            
            <div style={{ padding: '15px', backgroundColor: '#0d1117', borderRadius: '5px', border: '1px solid #30363d' }}>
              <h4 style={{ color: '#58a6ff' }}>Junior React Developer</h4>
              <p style={{ fontSize: '13px', marginTop: '5px' }}>Match Score: <strong>85%</strong></p>
              <div style={{ display: 'inline-block', padding: '4px 8px', backgroundColor: '#481d24', color: '#ff7b72', fontSize: '12px', borderRadius: '10px', marginTop: '10px' }}>
                Missing Skill: Node.js
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}