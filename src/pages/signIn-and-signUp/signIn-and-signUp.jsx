import React from 'react';
import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

import './signIn-and-signUp.scss';

const SignInAndSignUpPage =() =>(
    <div className= 'signIn-and-signUp'>
        <SignIn/>
        <SignUp/>
    </div>
)

export default SignInAndSignUpPage;