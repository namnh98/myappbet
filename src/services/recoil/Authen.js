import {atom} from 'recoil';

export const AuthenFormState = atom({
  key: 'AuthenForm',
  default: {
    tokenSignIn:'',
    tokenSignUp:''
  },
});