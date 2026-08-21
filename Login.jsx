import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Redirect to the home page after login
    navigate('/home');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ 
        backgroundColor: '#161b22', 
        padding: '40px', 
        borderRadius: '12px', 
        width: '100%', 
        maxWidth: '400px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        border: '1px solid #30363d'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#e6edf3' }}>Sign In</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
          <button type="submit" style={{ 
            backgroundColor: '#238636', 
            color: 'white', 
            padding: '12px', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            Log In
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#8b949e' }}>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}