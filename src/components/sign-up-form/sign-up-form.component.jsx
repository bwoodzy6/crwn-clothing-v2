import { useState } from "react";
import { createUserDocumentFromAuth } from "../../utils/firebase.utils";
import { createAuthUserFromEmailAndPassword } from "../../utils/createAuthUserFromEmailAndPassword";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
 displayName: "",
 email: "",
 password: "",
 confirmPassword: "",
};

const SignUpForm = () => {
 const [formFields, setFormFields] = useState(defaultFormFields);
 const { displayName, email, password, confirmPassword } = formFields;

 const clearFormFields = () => {
  setFormFields(defaultFormFields);
 };

 const handleChange = (event) => {
  const { name, value } = event.target;
  setFormFields({ ...formFields, [name]: value });
 };

 const handleSubmit = async (event) => {
  event.preventDefault();
  if (password !== confirmPassword) {
   alert("Passwords do not match");
   return;
  }

  try {
   const { user } = await createAuthUserFromEmailAndPassword(email, password);

   await createUserDocumentFromAuth(user, { displayName });
   clearFormFields();
  } catch (error) {
   if (error.code === "auth/email-already-in-use") {
    alert("Cannot create account, email already in use.");
   } else {
    console.log("Error creating user", error);
   }
  }
 };

 return (
  <div className='sign-up-container'>
   <h2>Don't have an account?</h2>
   <span>Sign up with your email and password</span>
   <form onSubmit={handleSubmit}>
    <FormInput
     label='Display Name'
     required
     type='text'
     onChange={handleChange}
     name='displayName'
     value={displayName}
    />
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
    <FormInput
     label='Confirm Password'
     required
     type='password'
     onChange={handleChange}
     name='confirmPassword'
     value={confirmPassword}
    />

    <Button type='submit'>Sign Up</Button>
   </form>
  </div>
 );
};

export default SignUpForm;
