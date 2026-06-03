import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDcClL0bEBZdO8jO1kHU9J3eqMQ_0ynVXY",
  authDomain: "mi-primer-firebase-997f2.firebaseapp.com",
  projectId: "mi-primer-firebase-997f2",
  storageBucket: "mi-primer-firebase-997f2.firebasestorage.app",
  messagingSenderId: "616867369537",
  appId: "1:616867369537:web:8507765bd7835d3c3cacc0"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firestore()