import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
  signOut,
  signInWithPopup,
} from '../src/service/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (providerName) => {
    try {
      const authProvider = getProvider(providerName);
      const authResult = await signInWithPopup(auth, authProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const getProvider = (name) => {
    switch (name) {
      case 'google':
        return googleAuthProvider;
      case 'facebook':
        return facebookAuthProvider;
      default:
        throw new Error('Unknown provider');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
