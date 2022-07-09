import {
  getAuth,
  facebookAuthProvider,
  googleAuthProvider,
  signInWithPopup,
  signOut,
} from './firebase';

export class AuthService {
  constructor() {
    this.firebaseAuth = getAuth();
  }

  async login(providerName) {
    try {
      const authProvider = this.getProvider(providerName);
      const authService = getAuth();
      const authResult = await signInWithPopup(authService, authProvider);
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {}

  getProvider(name) {
    switch (name) {
      case 'google':
        return googleAuthProvider;
      case 'facebook':
        return facebookAuthProvider;
      default:
        throw new Error('Unknown provider');
    }
  }
}
