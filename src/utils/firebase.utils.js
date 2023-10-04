import { initializeApp } from "firebase/app";
import {
 getAuth,
 signInWithRedirect,
 signInWithPopup,
 GoogleAuthProvider,
 createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyB3EMBmwRx3RE2De7HINBOIqUqX18kZT9g",
 authDomain: "crwn-clothing-db-6de97.firebaseapp.com",
 projectId: "crwn-clothing-db-6de97",
 storageBucket: "crwn-clothing-db-6de97.appspot.com",
 messagingSenderId: "1065750333666",
 appId: "1:1065750333666:web:ce7fb2cc4fa50157be36bb",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
 prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
 signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
 signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (
 userAuth,
 additionalInfo = {}
) => {
 if (!userAuth) return;
 const userDocRef = doc(db, "users", userAuth.uid);

 console.log(userDocRef);

 const userSnapshot = await getDoc(userDocRef);

 console.log(userSnapshot);
 console.log(userSnapshot.exists());

 if (!userSnapshot.exists()) {
  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try {
   await setDoc(userDocRef, {
    displayName,
    email,
    createdAt,
    ...additionalInfo,
   });
  } catch (error) {
   console.log("error creating the error: ", error.message);
  }
 }

 return userDocRef;
};

export const createAuthUserFromEmailAndPassword = async (email, password) => {
 if (!email || !password) return;

 return await createUserWithEmailAndPassword(auth, email, password);
};
