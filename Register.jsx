import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // After they create an account, send them to the onboarding screen
    navigate('/onboarding'); 
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ 
        backgroundColor: '#161b22', 
        padding: '40px', 
        borderRadius: '12px', 
        width: '100%', 
        maxWidth: '500px', // Made slightly wider to fit the new text area comfortably
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        border: '1px solid #30363d'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#e6edf3' }}>Create an Account</h2>
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white' }}
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white' }}
          />

          {/* NEW FIELD 1: Primary Interest Dropdown */}
          <label style={{ color: '#c9d1d9', fontSize: '14px', marginBottom: '-10px' }}>
            What is your primary interest?
          </label>
          <select 
            required 
            defaultValue=""
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white' }}
          >
            <option value="" disabled>Select an industry...</option>
            <option value="tech">Tech</option>
            <option value="medical">Medical</option>
            <option value="finance">Finance</option>
            <option value="other">Other</option>
          </select>

          {/* NEW FIELD 2: YouTube and LinkedIn Details */}
          <label style={{ color: '#c9d1d9', fontSize: '14px', marginBottom: '-10px' }}>
            Tell us about your YouTube & LinkedIn interests:
          </label>
          <textarea 
            placeholder="e.g., I watch coding tutorials on YouTube and follow tech leaders on LinkedIn..." 
            required 
            rows="3"
            style={{ 
              padding: '12px', 
              borderRadius: '6px', 
              border: '1px solid #30363d', 
              backgroundColor: '#0d1117', 
              color: 'white',
              resize: 'vertical' // Allows the user to drag the box taller if they need more space
            }}
          />

          <button type="submit" style={{ 
            backgroundColor: '#238636', 
            color: 'white', 
            padding: '12px', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            marginTop: '10px'
          }}>
            Register
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#8b949e' }}>
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
}