import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyCykZk0DOCdUemwsCDOYpzZ8BouGt4XBAE",
//   authDomain: "smartwatch-monitor.firebaseapp.com",
//   databaseURL: "https://smartwatch-monitor-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "smartwatch-monitor",
//   storageBucket: "smartwatch-monitor.firebasestorage.app",
//   messagingSenderId: "499423059866",
//   appId: "1:499423059866:web:d6724f6c995683bb512423",
// };

const firebaseConfig = {
    apiKey: "AIzaSyCykZk0DOCdUemwsCDOYpzZ8BouGt4XBAE",
    authDomain: "smartwatch-monitor.firebaseapp.com",
    databaseURL: "https://smartwatch-monitor-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smartwatch-monitor",
    storageBucket: "smartwatch-monitor.firebasestorage.app",
    messagingSenderId: "499423059866",
    appId: "1:499423059866:android:b3cfad7ad3dbed79512423"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
