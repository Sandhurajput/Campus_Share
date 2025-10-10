import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Header from "./components/Header";
import Home from "./pages/home";
import BrowseItems from "./pages/BrowseItem";
import PostItem from "./pages/PostItem";
import RequestItem from "./pages/RequestItem";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notification";
import AuthScreen from './components/AuthScreen';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser?.email || "No user");
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen font-sans">
        <div>
          <div>Loading authentication state...</div>
          <div className="text-sm text-gray-600 mt-2">
            Please wait while we check your login status
          </div>
        </div>
      </div>
    );
  }

  // 👇 show AuthScreen if user is not logged in
  if (!user) {
    return <AuthScreen />;
  }

  // 👇 show main app if user is logged in
  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseItems />} />
          <Route path="/post" element={<PostItem />} />
          <Route path="/request" element={<RequestItem />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
