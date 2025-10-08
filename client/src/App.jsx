import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import BrowseItems from "./pages/BrowseItem";
import PostItem from "./pages/PostItem";
import RequestItem from "./pages/RequestItem";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notification";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowseItems />} />
            <Route path="/post" element={<PostItem />} />
            <Route path="/request" element={<RequestItem />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App;
