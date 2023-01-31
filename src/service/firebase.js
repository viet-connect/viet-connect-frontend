import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
/* Auth modules */
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
facebookAuthProvider.addScope('public_profile');
facebookAuthProvider.addScope('email');
facebookAuthProvider.setCustomParameters({
	display: 'popup',
});

export const auth = getAuth();
export { signInWithPopup, signOut, googleAuthProvider, facebookAuthProvider };

/* [ Currently not on use ]
  export const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      googleAuthProvider.providerId,
      facebookAuthProvider.providerId,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  export default StyledFirebaseUI;
*/
