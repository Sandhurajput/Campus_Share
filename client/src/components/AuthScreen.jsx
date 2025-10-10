import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


const AuthScreen = () => {
  const [isLoginView, setIsLoginView] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignupSuccess = () => {
    setIsLoginView(true);
    setIsSigningUp(false);
  };

  const AuthTogglePanel = ({ title, buttonText, onClick }) => (
    <div className="w-full lg:w-1/2 p-8 md:p-12 text-center flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-800 text-white rounded-r-2xl shadow-inner">
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-sm mb-8 opacity-90">
        {isLoginView
          ? "Need an account? Sign up now and join our community!"
          : "Welcome back! Please login with your existing account."}
      </p>
      <button
        onClick={onClick}
        className="px-8 py-3 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
      >
        {buttonText}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4 font-sans">
      <div
        className={`flex max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform duration-500 ${
          isLoginView ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {isLoginView ? (
          <LoginForm onSwitchToSignup={() => setIsLoginView(false)} />
        ) : (
          <SignupForm
            onSwitchToLogin={() => setIsLoginView(true)}
            onSignupStart={() => setIsSigningUp(true)}
            onSignupSuccess={handleSignupSuccess}
            onSignupError={() => setIsSigningUp(false)}
          />
        )}

        <AuthTogglePanel
          title={isLoginView ? "New Here?" : "Already have an account?"}
          buttonText={isLoginView ? "Sign Up" : "Login"}
          onClick={() => setIsLoginView(!isLoginView)}
        />
      </div>
    </div>
  );
};

export default AuthScreen;
