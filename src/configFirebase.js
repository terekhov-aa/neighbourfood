import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/storage';

const config = {
    apiKey: 'AIzaSyB-xck_i_hEwkSyaLgDrgmmijFfTznIBag',
    authDomain: 'neighborfood-1544645681195.firebaseapp.com',
    databaseURL: 'https://neighborfood-1544645681195.firebaseio.com',
    projectId: 'neighborfood-1544645681195',
    storageBucket: 'neighborfood-1544645681195.appspot.com',
    messagingSenderId: '890252059927'
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

// Disable deprecated features
// db.settings({
//     timestampsInSnapshots: false
// });

db.enablePersistence({synchronizeTabs:true})

const storage = firebase.storage()

export default {
    db,
    storage
}
