import {
 signInWithGooglePopup,
 createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

const logGoogleUser = async () => {
 const { user } = await signInWithGooglePopup();
 console.log(user);
 const userDocRef = await createUserDocumentFromAuth(user);
};

const SignIn = () => {
 return (
  <div>
   <div>Sign In</div>
   <button onClick={logGoogleUser}>Sign-in Google Popup</button>
  </div>
 );
};

export default SignIn;
