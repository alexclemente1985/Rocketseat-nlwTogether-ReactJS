import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType) ;

const AuthContextProvider: React.FC<AuthContextProviderProps> = (props:AuthContextProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<User>();

  const userHandler = (user: firebase.User | null) =>{
    if(user){
      const { displayName, photoURL, uid } = user;
      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account.')
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    userHandler(result.user);
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      userHandler(user);
    });

    return () =>{
      unsubscribe();
    }

  },[])
  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
    );
}

export default AuthContextProvider;