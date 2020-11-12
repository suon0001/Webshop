 import firebase from 'firebase/app'
 import 'firebase/firestore'
 import 'firebase/storage'

 // Your web app's Firebase configuration
 var firebaseConfig = {
     apiKey: "AIzaSyBzsQ4hGDqFRSr4nJqc55LfWlKuEQ520Tw",
     authDomain: "webshop---digicode.firebaseapp.com",
     databaseURL: "https://webshop---digicode.firebaseio.com",
     projectId: "webshop---digicode",
     storageBucket: "webshop---digicode.appspot.com",
     messagingSenderId: "558883581228",
     appId: "1:558883581228:web:ae5c2da75d827f4bf75089",
     measurementId: "G-ES1R81MFZH"
 };
 // Initialize Firebase
 export const fb = firebase.initializeApp(firebaseConfig);
 //firebase.analytics();

 export const db = firebase.firestore()
 export const dbMenuAdd = db.collection('menuItems');