// // console.log("API KEY:", import.meta.env.VITE_FIREBASE_API_KEY);



// // import { initializeApp } from "firebase/app";
// // import { getAuth } from "firebase/auth";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyB1AFKVO-10IX1UK8w8Akv-3G655J-oM9Y",
// //   authDomain: "piggypath-8ca20.firebaseapp.com",
// //   projectId: "piggypath-8ca20",
// //   storageBucket: "piggypath-8ca20.appspot.com",
// //   messagingSenderId: "1051870477002",
// //   appId: "1:1051870477002:web:a0d2b90b68a9cf8ef7d233",
// // };

// // const app = initializeApp(firebaseConfig);
// // export const auth = getAuth(app);



// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "piggypath-8ca20.firebaseapp.com",
//   projectId: "piggypath-8ca20",
//   storageBucket: "piggypath-8ca20.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);



// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1AFKVO-iQ1X1UK8w8Aky-3G655J-oM9Y",
  authDomain: "piggypath-8ca20.firebaseapp.com",
  projectId: "piggypath-8ca20",
  storageBucket: "piggypath-8ca20.firebasestorage.app",
  messagingSenderId: "1051870477002",
  appId: "1:1051870477002:web:a0d2b90b68a9cf8ef7d233"
};

const app = initializeApp(firebaseConfig);

// 🔥 AUTH WITH PERSISTENCE
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// Optional exports
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;