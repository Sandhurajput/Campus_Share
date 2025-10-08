


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyB38E5iZuVTsYVepe5s_Xok1__73Y8L-Wc",
  authDomain: "login-singup-9ad66.firebaseapp.com",
  databaseURL: "https://login-singup-9ad66-default-rtdb.firebaseio.com",
  projectId: "login-singup-9ad66",
  storageBucket: "login-singup-9ad66.firebasestorage.app",
  messagingSenderId: "613436309403",
  appId: "1:613436309403:web:f9620891d40f36d9f92b3e",
  measurementId: "G-MPJTP2QXB7"
};


const app = initializeApp(firebaseConfig);


const analytics = getAnalytics(app);


const auth = getAuth(app);


export { auth };

