import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, MessageSquare, Bell } from "lucide-react";
import { auth } from "../firebaseConfig";
import ProfilePopupContent from "./ProfilePopupContent";
import EditProfileModal from "./EditProfileModal";

const Header = ({ user, onLogout }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const profileRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/browse" },
    { name: "Post Item", path: "/post" },
    { name: "Updates", path: "/request" },
    { name: <MessageSquare className="w-6 h-6" />, path: "/chat" },
    { name: <Bell className="w-6 h-6" />, path: "/notifications" },
  ];

  // --- Load user profile data ---
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        console.log("Loading user profile for:", user.email);
        try {
          // Try to get user profile from backend
          const idToken = await user.getIdToken();
          const response = await fetch('http://localhost:5000/api/get-profile', {
            headers: {
              'Authorization': `Bearer ${idToken}`,
            },
          });

          if (response.ok) {
            const profileData = await response.json();
            console.log("Profile data loaded from backend:", profileData);
            setUserProfile({
              name: profileData.user?.username || user.email,
              email: user.email,
              initials: (profileData.user?.username || user.email).split(' ').map(n => n[0]).join('').toUpperCase(),
              location: "University Main Campus",
              itemsShared: profileData.user?.itemsShared || 0,
              itemsBorrowed: profileData.user?.itemsBorrowed || 0,
              rating: profileData.user?.rating || 5.0,
              profileImage: user.photoURL || "",
            });
          } else {
            console.log("Backend profile not found, using fallback");
            // Fallback to basic user info
            setUserProfile({
              name: user.displayName || user.email.split('@')[0],
              email: user.email,
              initials: (user.displayName || user.email.split('@')[0]).split(' ').map(n => n[0]).join('').toUpperCase(),
              location: "University Main Campus",
              itemsShared: 0,
              itemsBorrowed: 0,
              rating: 5.0,
              profileImage: user.photoURL || "",
            });
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
          // Fallback profile
          setUserProfile({
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            initials: (user.displayName || user.email.split('@')[0]).split(' ').map(n => n[0]).join('').toUpperCase(),
            location: "University Main Campus",
            itemsShared: 0,
            itemsBorrowed: 0,
            rating: 5.0,
            profileImage: user.photoURL || "",
          });
        }
      } else {
        console.log("No user found, clearing profile");
        setUserProfile(null);
      }
    };

    loadUserProfile();
  }, [user]);

  // --- Close popup on outside click ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfilePopupOpen && 
          profileRef.current && !profileRef.current.contains(e.target) &&
          mobileProfileRef.current && !mobileProfileRef.current.contains(e.target)) {
        setIsProfilePopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfilePopupOpen]);

  const openEditModal = () => {
    setIsProfilePopupOpen(false);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <header className="w-full bg-white shadow-lg sticky top-0 z-[60]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-[#3a75c4] cursor-pointer">
          NGJugaad
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-base font-medium transition-all duration-300 rounded-lg p-2 hover:bg-[#3a75c4] hover:text-white"
            >
              {item.name}
            </Link>
          ))}

          {/* Profile Icon */}
          <div className="relative ml-4" ref={profileRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsProfilePopupOpen((prev) => !prev);
              }}
              className={`p-2 rounded-full transition-all duration-200 ${
                isProfilePopupOpen
                  ? "bg-[#3a75c4] text-white shadow-md"
                  : "text-gray-600 hover:bg-[#3a75c4] hover:text-white"
              }`}
              aria-label="Toggle Profile Menu"
            >
              <User className="w-6 h-6" />
            </button>

            {isProfilePopupOpen && (userProfile || user) && (
              <ProfilePopupContent
                user={userProfile || {
                  name: user.displayName || user.email.split('@')[0],
                  email: user.email,
                  initials: (user.displayName || user.email.split('@')[0]).split(' ').map(n => n[0]).join('').toUpperCase(),
                  location: "University Main Campus",
                  itemsShared: 0,
                  itemsBorrowed: 0,
                  rating: 5.0,
                  profileImage: user.photoURL || "",
                }}
                handleClose={() => setIsProfilePopupOpen(false)}
                navigate={navigate}
                openEditModal={openEditModal}
                onLogout={onLogout}
              />
            )}
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Mobile Profile Button */}
          <div className="relative" ref={mobileProfileRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isMobileOpen) setIsMobileOpen(false);
                setIsProfilePopupOpen((prev) => !prev);
              }}
              className={`p-2 rounded-full transition-all duration-200 ${
                isProfilePopupOpen
                  ? "bg-[#3a75c4] text-white shadow-md"
                  : "text-gray-600 hover:bg-[#3a75c4] hover:text-white"
              }`}
            >
              <User className="w-6 h-6" />
            </button>
            {isProfilePopupOpen && (userProfile || user) && (
              <ProfilePopupContent
                user={userProfile || {
                  name: user.displayName || user.email.split('@')[0],
                  email: user.email,
                  initials: (user.displayName || user.email.split('@')[0]).split(' ').map(n => n[0]).join('').toUpperCase(),
                  location: "University Main Campus",
                  itemsShared: 0,
                  itemsBorrowed: 0,
                  rating: 5.0,
                  profileImage: user.photoURL || "",
                }}
                handleClose={() => setIsProfilePopupOpen(false)}
                navigate={navigate}
                openEditModal={openEditModal}
                onLogout={onLogout}
              />
            )}
          </div>

          {/* Hamburger Icon */}
          <button
            className="text-gray-700 p-2"
            onClick={() => {
              if (isProfilePopupOpen) setIsProfilePopupOpen(false);
              setIsMobileOpen(!isMobileOpen);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileOpen && (
        <nav className="md:hidden bg-white shadow-lg border-t border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-gray-700 px-4 py-2 transition-colors hover:bg-[#3a75c4] hover:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (userProfile || user) && (
        <EditProfileModal 
          user={userProfile || {
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            initials: (user.displayName || user.email.split('@')[0]).split(' ').map(n => n[0]).join('').toUpperCase(),
            location: "University Main Campus",
            itemsShared: 0,
            itemsBorrowed: 0,
            rating: 5.0,
            profileImage: user.photoURL || "",
          }} 
          setUser={setUserProfile} 
          closeModal={closeEditModal} 
        />
      )}
    </header>
  );
};

export default Header;
