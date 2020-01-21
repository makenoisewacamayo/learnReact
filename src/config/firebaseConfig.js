import * as firebase from "firebase/app";
// import auth from firebase
import "firebase/auth";

import secrets from "./secrets";

const firebaseConfig = {
  apiKey: secrets.apiKey,
  authDomain: secrets.authDomain,
  databaseURL: secrets.databaseURL,
  projectId: secrets.projectId,
  storageBucket: secrets.storageBucket,
  messagingSenderId: secrets.messagingSenderId,
  appId: secrets.appId
};

firebase.initializeApp(firebaseConfig);



export default firebase;



