import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      //  Firebase Auth me login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      //  ID Token Firebase se
      const idToken = await user.getIdToken();

      //  Backend ko token bhejna (optional profile update)
      const response = await fetch('http://localhost:5000/api/login-profile', {
        method: 'POST', // backend me route bana lo: login-profile
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`, // Token send to backend
        },
        body: JSON.stringify({ lastLogin: new Date().toISOString() }), // optional data
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'User logged in successfully!');
      } else {
        setError(data.message || 'Login failed.');
      }

      // Form reset
      setEmail('');
      setPassword('');

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginForm;
