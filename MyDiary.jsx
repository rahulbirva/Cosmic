import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyDiary() {
  const navigate = useNavigate();

  // State to hold the dummy notes
  const [notes, setNotes] = useState([
    { id: 1, title: 'React Hooks', text: 'useEffect runs side effects in function components. Don\'t forget the dependency array!', date: 'Oct 24, 2026' },
    { id: 2, title: 'Missing Skill Tracker', text: 'I need to learn Node.js to apply for that Junior Dev job.', date: 'Oct 25, 2026' }
  ]);

  // Function to delete a note by its ID
  const handleDelete = (idToRemove) => {
    setNotes(notes.filter(note => note.id !== idToRemove));
  };

  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', color: 'white', padding: '40px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1>My Diary</h1>
        <button onClick={() => navigate('/home')} style={{ padding: '10px 20px', backgroundColor: '#21262d', color: 'white', border: '1px solid #30363d', borderRadius: '5px', cursor: 'pointer' }}>
          Back to Home
        </button>
      </div>

      {notes.length === 0 ? (
        <p style={{ color: '#8b949e' }}>Your diary is empty. Go save some knowledge!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {notes.map(note => (
            <div key={note.id} style={{ backgroundColor: '#161b22', padding: '20px', borderRadius: '10px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ color: '#58a6ff', marginBottom: '10px' }}>{note.title}</h3>
                <p style={{ color: '#c9d1d9', lineHeight: '1.5', fontSize: '14px' }}>{note.text}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid #30363d', paddingTop: '15px' }}>
                <span style={{ color: '#8b949e', fontSize: '12px' }}>{note.date}</span>
                <button 
                  onClick={() => handleDelete(note.id)} 
                  style={{ padding: '5px 10px', backgroundColor: '#da3633', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}