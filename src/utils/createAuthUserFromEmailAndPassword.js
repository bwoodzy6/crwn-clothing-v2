import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.utils";

export const createAuthUserFromEmailAndPassword = async (email, password) => {
 if (!email || !password) return;

 return await createUserWithEmailAndPassword(auth, email, password);
};
