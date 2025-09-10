// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDSY6PHDEar-vWzRif01A8Av6XDpNSDEq8",
  authDomain: "wedding-concierge-e0b77.firebaseapp.com",
  projectId: "wedding-concierge-e0b77",
  storageBucket: "wedding-concierge-e0b77.firebasestorage.app",
  messagingSenderId: "124999115529",
  appId: "1:124999115529:web:17f0a6447b6758ba7ae9d8",
  measurementId: "G-TKR8RCBE9W",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, messaging, getToken, onMessage };
