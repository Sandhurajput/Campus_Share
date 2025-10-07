
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  const [user, setUser] = useState(null);
  const [protectedData, setProtectedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current user:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); 
  }, []);


  const saveUserToFirestore = async () => {
  if (!user) return;
  try {
    const token = await user.getIdToken();
    await fetch("http://localhost:5000/api/save-user-firestore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ email: user.email, uid: user.uid }),
    });
    console.log("User data saved to Firestore!");
  } catch (error) {
    console.error("Error saving user to Firestore:", error.message);
  }
};


useEffect(() => {
  if (user) {
    saveUserToFirestore();
  }
}, [user]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setProtectedData(null); 
      setBackendError('');
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const getProtectedDataFromBackend = async () => {
    setBackendError('');
    if (!user) {
      setBackendError('No user logged in to fetch protected data.');
      return;
    }

    try {
      const idToken = await user.getIdToken(); 
      const response = await fetch('http://localhost:5000/api/protected-data', {
        headers: {
          'Authorization': `Bearer ${idToken}` 
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch protected data from backend.');
      }

      const data = await response.json();
      setProtectedData(data);
    } catch (error) {
      console.error('Error fetching protected data:', error.message);
      setBackendError(error.message);
    }
  };

  if (loading) {
    return <div>Loading authentication state...</div>;
  }


  

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Firebase & Custom Backend Auth</h1>

      {user ? (
        <div>
          <p>Welcome, {user.email} (UID: {user.uid})!</p>
          <button onClick={handleLogout} style={{ marginRight: '10px' }}>Logout</button>
          <button onClick={getProtectedDataFromBackend}>Get Protected Data from Backend</button>

          {protectedData && (
            <div style={{ marginTop: '20px', border: '1px dashed #007bff', padding: '10px' }}>
              <h3>Protected Data from Backend:</h3>
              <pre>{JSON.stringify(protectedData, null, 2)}</pre>
            </div>
          )}
          {backendError && <p style={{ color: 'red' }}>Backend Error: {backendError}</p>}
        </div>
      ) : (
        <div>
          <p>Please log in or sign up.</p>
          <LoginForm />
          <SignupForm />
        </div>
      )}
    </div>
  );
}

export default App;
