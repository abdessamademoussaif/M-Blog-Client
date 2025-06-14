import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYZlElxf5CGxD7APAk9VYr0JAcZtTq_WQ",
  authDomain: "blog-f9408.firebaseapp.com",
  projectId: "blog-f9408",
  storageBucket: "blog-f9408.firebasestorage.app",
  messagingSenderId: "653699716890",
  appId: "1:653699716890:web:b27df0d70a37c5af1dbea3",
  measurementId: "G-YEE7D6C15F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
