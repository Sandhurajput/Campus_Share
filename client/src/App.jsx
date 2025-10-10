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
import Footer from "./components/Footer";

import About from "./footer/About";
import Work from "./footer/Work";
import Trust from "./footer/Trust";
import Community from "./footer/Community";
import Terms from "./footer/Terms";
import Privacy from "./footer/Privacy";
import Help from "./footer/Help";
import Guidelines from "./footer/Guidelines";


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
           <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/community" element={<Community />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/help" element={<Help />} />
          <Route path="/guidelines" element={<Guidelines />} />
        </Routes>


      </main>
      <Footer/>
    </Router>
    
    </>
  )
}

export default App
