// /* public/firebase-messaging-sw.js */
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyDSY6PHDEar-vWzRif01A8Av6XDpNSDEq8",
  authDomain: "wedding-concierge-e0b77.firebaseapp.com",
  projectId: "wedding-concierge-e0b77",
  storageBucket: "wedding-concierge-e0b77.firebasestorage.app",
  messagingSenderId: "124999115529",
  appId: "1:124999115529:web:17f0a6447b6758ba7ae9d8",
  measurementId: "G-TKR8RCBE9W",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
