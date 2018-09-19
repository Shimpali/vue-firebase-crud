import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCv7utktryyqmup6zdkMsu1ZMP_sw5-Lsk',
  authDomain: 'ninja-smoothies-e87aa.firebaseapp.com',
  databaseURL: 'https://ninja-smoothies-e87aa.firebaseio.com',
  projectId: 'ninja-smoothies-e87aa',
  storageBucket: 'ninja-smoothies-e87aa.appspot.com',
  messagingSenderId: '503077716267'
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

//Export firestore database
export default firebase.firestore();
