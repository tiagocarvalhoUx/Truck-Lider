import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzJZ-oGNhb0UusFzjIu4FZTjS5lSOpjfA",
  authDomain: "truck-lider.firebaseapp.com",
  projectId: "truck-lider",
  storageBucket: "truck-lider.firebasestorage.app",
  messagingSenderId: "601611074529",
  appId: "1:601611074529:web:25f44e1e37d80470cc30a0",
  measurementId: "G-47TEVFW2WR"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
