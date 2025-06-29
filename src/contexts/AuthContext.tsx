
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    // Para demonstração, simular login com credenciais específicas
    if (email === 'testuser@empresa.com' && password === 'Teste@1234') {
      const mockUser = {
        uid: 'test-user-id',
        email: 'testuser@empresa.com',
        displayName: 'Usuário Teste'
      } as User;
      setCurrentUser(mockUser);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      return;
    }
    
    // Em produção real, usar Firebase Auth
    // await signInWithEmailAndPassword(auth, email, password);
    throw new Error('Credenciais inválidas. Use: testuser@empresa.com / Teste@1234');
  };

  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem('mockUser');
    // Em produção real: await signOut(auth);
  };

  useEffect(() => {
    // Verificar se há usuário mockado no localStorage
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      setCurrentUser(JSON.parse(mockUser));
    }
    
    setLoading(false);

    // Em produção real, usar Firebase Auth listener
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   setCurrentUser(user);
    //   setLoading(false);
    // });
    // return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
