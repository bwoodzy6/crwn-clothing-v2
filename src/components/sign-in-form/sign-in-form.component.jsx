import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
 createUserDocumentFromAuth,
 signInWithGooglePopup,
 signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
 email: "",
 password: "",
};

const SignInFrom = () => {
 const [formFields, setFormFields] = useState(defaultFormFields);
 const { email, password } = formFields;

 console.log(formFields);

 const clearFormFields = () => {
  setFormFields(defaultFormFields);
 };

 const handleChange = (event) => {
  const { name, value } = event.target;
  setFormFields({ ...formFields, [name]: value });
 };

 const handleSubmit = async (event) => {
  event.preventDefault();

  try {
   const response = await signInAuthUserWithEmailAndPassword(email, password);
   console.log(response);
   clearFormFields();
  } catch (error) {
   if (error.code === "auth/invalid-login-credentials")
    alert("Incorrect email or password");
  }
 };

 const signInWithGoogle = async () => {
  const { user } = await signInWithGooglePopup();
  await createUserDocumentFromAuth(user);
 };

 return (
  <div className='sign-in-container'>
   <h2>Already have an account?</h2>
   <span>Sign in with your email and password</span>
   <form onSubmit={handleSubmit}>
    <FormInput
     label='Email'
     required
     type='email'
     onChange={handleChange}
     name='email'
     value={email}
    />
    <FormInput
     label='Password'
     required
     type='password'
     onChange={handleChange}
     name='password'
     value={password}
    />
    <div className='buttons-container'>
     <Button type='submit'>SIGN IN</Button>
     <Button type='button' buttonType='google' onClick={signInWithGoogle}>
      GOOGLE SIGN IN
     </Button>
    </div>
   </form>
  </div>
 );
};

export default SignInFrom;
