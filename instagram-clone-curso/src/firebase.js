// Importa os módulos necessários da SDK modular
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Configuração do Firebase (copiada do seu projeto)
const firebaseConfig = {
  apiKey: "AIzaSyCQrOAR4d053nIYmQ_uh0zSTEe81MN1hyo",
  authDomain: "instagram-clone-curso-12328.firebaseapp.com",
  projectId: "instagram-clone-curso-12328",
  storageBucket: "instagram-clone-curso-12328.appspot.com",  // Corrigido: .app → .com
  messagingSenderId: "1054621700799",
  appId: "1:1054621700799:web:c90c3a3f701375c201ec0a"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços que você vai usar
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// Exporta os serviços para usar em outras partes da aplicação
export { db, auth, storage, functions };
