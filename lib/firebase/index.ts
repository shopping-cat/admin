import firebase from 'firebase/app'
import 'firebase/auth'

export const firebaseConfig = {
    apiKey: "AIzaSyDhon5V-8BEjvPh7-RGwLEScQ_eJmm2EzM",
    authDomain: "shopping-pet-admin.firebaseapp.com",
    projectId: "shopping-pet-admin",
    storageBucket: "shopping-pet-admin.appspot.com",
    messagingSenderId: "570029548064",
    appId: "1:570029548064:web:a8157d82d315cfefef5245"
}

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()

export const auth = app.auth()