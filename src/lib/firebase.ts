
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase - substitua pelas suas credenciais
const firebaseConfig = {
  apiKey: "AIzaSyCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxxxxxxxxxx"
};

// Para fins de demonstração, use uma configuração de teste
// Em produção, use suas credenciais reais do Firebase
const testConfig = {
  apiKey: "demo-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Initialize Firebase
const app = initializeApp(testConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
