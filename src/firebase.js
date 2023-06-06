import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyClyYqjvrTWUVFZqRXdF6kHwOWvp1O9k0M",
  authDomain: "chatmongers.firebaseapp.com",
  projectId: "chatmongers",
  storageBucket: "chatmongers.appspot.com",
  messagingSenderId: "461490140943",
  appId: "1:461490140943:web:04b5a232f7d3fa04c1707a"
};

export const app = initializeApp(firebaseConfig);