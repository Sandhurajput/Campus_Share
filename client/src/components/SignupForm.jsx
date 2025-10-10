
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 

function SignupForm({ onSwitchToLogin, onSignupStart, onSignupSuccess, onSignupError }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Notify parent that signup is starting
    if (onSignupStart) {
      onSignupStart();
    }

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log("User created in Firebase Auth:", user.uid);

      // Get ID token for backend
      const idToken = await user.getIdToken();

      // Save user profile to backend (this will save to both Realtime DB and Firestore)
      const response = await fetch('http://localhost:5000/api/signup-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`, 
        },
        body: JSON.stringify({ username: username }),
      });

      console.log("Backend response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(errorData.message || 'Failed to save user profile to backend');
      }

      const responseData = await response.json();
      console.log("User profile saved successfully:", responseData);

      // IMPORTANT: Sign out the user immediately after successful account creation
      console.log("Signing out user...");
      await signOut(auth);
      console.log("User signed out successfully");
      
      setMessage('Account created successfully! Please login to continue.');
      
      // Reset form
      setUsername('');
      setEmail('');
      setPassword('');
      
      // Wait a moment to ensure signOut is processed, then notify parent
      setTimeout(() => {
        if (onSignupSuccess) {
          console.log("Calling onSignupSuccess...");
          onSignupSuccess();
        }
      }, 500);

    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
      
      // Reset signup state on error
      if (onSignupError) {
        onSignupError();
      }
    }
  };

  return (
    <div className="w-full lg:w-1/2 p-8 md:p-12">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Create Account</h2>
      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
        >
          Create Account
        </button>
      </form>
      {message && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <p className="text-center text-gray-600 text-sm mt-6">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          Login here
        </button>
      </p>
    </div>
  );
}

export default SignupForm;
