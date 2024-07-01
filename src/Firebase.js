
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfQB4hKHFmNc8qOOpxAOtyTov4ykt6qTM",
  authDomain: "fir-modsen.firebaseapp.com",
  projectId: "fir-modsen",
  storageBucket: "fir-modsen.appspot.com",
  messagingSenderId: "365856895541",
  appId: "1:365856895541:web:76c779932bfa6887bc377c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth}