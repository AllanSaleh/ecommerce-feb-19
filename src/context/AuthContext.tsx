import { createContext, useState, useEffect, useContext } from "react";
import {auth} from "../lib/firebase/firebase"
import { onAuthStateChanged, User } from "firebase/auth";

const AuthContext = createContext({
  user: null,
  setUser: (user: any) => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;