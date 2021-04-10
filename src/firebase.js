// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAjEbiOZzmcFMn0n9ZskjSqsOhkoR8qF4k",
    authDomain: "mail-clone-akky.firebaseapp.com",
    projectId: "mail-clone-akky",
    storageBucket: "mail-clone-akky.appspot.com",
    messagingSenderId: "1095476318599",
    appId: "1:1095476318599:web:6b70b0754aae14b3764322",
    measurementId: "G-D0W06RGREB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  const db = firebaseApp.firestore()

  export {auth, provider}
  export default db