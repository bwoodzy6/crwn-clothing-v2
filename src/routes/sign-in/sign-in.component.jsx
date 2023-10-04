import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
 signInWithGooglePopup,
 createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

const SignIn = () => {
 const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  const userDocRef = await createUserDocumentFromAuth(user);
 };

 return (
  <div>
   <div>Sign In</div>
   <button onClick={logGoogleUser}>Sign-in Google Popup</button>
   <SignUpForm />
  </div>
 );
};

export default SignIn;
