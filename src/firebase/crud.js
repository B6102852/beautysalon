import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';

var firebaseConfig = {
    apiKey: "AIzaSyAqtUdY7qm17D4xs4ip9QQZ9VhrZvvtuFQ",
    authDomain: "beautysalon-62956.firebaseapp.com",
    databaseURL: "https://beautysalon-62956-default-rtdb.firebaseio.com",
    projectId: "beautysalon-62956",
    storageBucket: "beautysalon-62956.appspot.com",
    messagingSenderId: "918783430228",
    appId: "1:918783430228:web:03ce6cc4523550f5b127c1",
    measurementId: "G-3J0HV4YLD9"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default firebase;