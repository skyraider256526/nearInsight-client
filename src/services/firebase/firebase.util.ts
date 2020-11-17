import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXAdv914Vfg6jGthICOGNAa7_lLp8Hsl0",
  authDomain: "near-insight.firebaseapp.com",
  databaseURL: "https://near-insight.firebaseio.com",
  projectId: "near-insight",
  storageBucket: "near-insight.appspot.com",
  messagingSenderId: "370297661080",
  appId: "1:370297661080:web:bae687f9b0dd41b71fd2ed",
  measurementId: "G-7LGD85VY05",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth(),
  firestore = firebase.firestore();

export async function createUserProfileDocument(
  userAuth: firebase.User | any,
  additionlData?: any
) {
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth,
      createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionlData,
      });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }

  return userRef;
}

export default firebase;
