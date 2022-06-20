// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCLayGWHTOKpgQ9IUfrwL0DoEL65RqW3Oc",
    authDomain: "react-app-cursos-562e6.firebaseapp.com",
    projectId: "react-app-cursos-562e6",
    storageBucket: "react-app-cursos-562e6.appspot.com",
    messagingSenderId: "288987449701",
    appId: "1:288987449701:web:ae4d81b8d270e02fe8b98c",
    measurementId: "G-T6WVPS1Q9B"
};

// Initialize Firebase

//Esto sirve para la autenticacion y el DB
export const FirebaseApp = initializeApp(firebaseConfig);
//Aca viene todas las funcionalidades de autenticacion
export const FirebaseAuth = getAuth(FirebaseApp);
// Aca viene la configuracion de la base de datos
export const FirebaseDB = getFirestore(FirebaseApp);
export const analytics = getAnalytics(app);