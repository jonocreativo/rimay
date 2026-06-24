// Configuración de Firebase App
const firebaseConfig = {
  projectId: "rimay-d302f",
  appId: "1:780106877886:web:8049d27f87254c8da647ef",
  storageBucket: "rimay-d302f.firebasestorage.app",
  apiKey: "AIzaSyC4LxIEoShTrRQFK9jh-cHwG336RerQ8ew",
  authDomain: "rimay-d302f.firebaseapp.com",
  messagingSenderId: "780106877886"
};

// Inicialización de Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
