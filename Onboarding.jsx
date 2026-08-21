import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [interests, setInterests] = useState('');

  const handleComplete = (e) => {
    e.preventDefault();
    // Later, this will send the file and interests to your backend
    console.log("Uploaded File:", resume);
    console.log("Interests:", interests);
    navigate('/home'); // Go to the dashboard!
  };

  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', color: 'white', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#161b22', padding: '40px', borderRadius: '10px', width: '100%', maxWidth: '500px' }}>
        <h2 style={{ marginBottom: '20px' }}>Let's Build Your Profile</h2>
        
        <form onSubmit={handleComplete}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>What are your main interests? (e.g., Tech, Finance)</label>
            <input 
              type="text" 
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Web Development, Space, Finance..."
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white' }}
              required
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>Upload your Resume (PDF only)</label>
            <input 
              type="file" 
              accept=".pdf" 
              onChange={(e) => setResume(e.target.files[0])}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white' }}
              required
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#238636', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Go to My Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}