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

if (location.hostname === "localhost") {
  firestore.useEmulator("localhost", 8080);
  auth.useEmulator("http://localhost:9099/");
}

export async function createUserProfileDocument(
  userAuth: firebase.User | any,
  additionlData?: any
) {
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const noImg = "no-img.png";
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth,
      createdAt = new Date();
    try {
      await userRef.set({
        userId: userAuth.uid,
        displayName,
        email,
        createdAt,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
        ...additionlData,
      });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }

  return userRef;
}

export default firebase;
