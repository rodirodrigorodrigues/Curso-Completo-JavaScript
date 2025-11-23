import { useState } from 'react';
import { auth, storage, db } from './firebase.js';
import {
  getFirestore,
  serverTimestamp,
  collection,
  addDoc
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


function Header() {
  const [user, setUser] = useState(null);
  const [progress, setProguess] = useState(0);
  const [file, setFile] = useState(null);

  function abrirModalCriarConta(e) {
    e.preventDefault();
    const modal = document.querySelector('.modalCriarConta');
    modal.style.display = 'block';
  }

  function fecharModalCriarConta(e) {
    e.preventDefault();
    const modal = document.querySelector('.modalCriarConta');
    modal.style.display = 'none';
  }

  function abrirModalUpload(e) {
    e.preventDefault();
    const modal = document.querySelector('.modalUpload');
    modal.style.display = 'block';
  }

  function fecharModalUpload(e) {
    e.preventDefault();
    const modal = document.querySelector('.modalUpload');
    modal.style.display = 'none';
  }

  function uploadPost(e) {
    e.preventDefault();

    if (!file) {
      alert("Selecione um arquivo");
      return;
    }

    const tituloUpload = document.getElementById("titulo-upload").value;
    // Cria o caminho no Storage
    const storageRef = ref(storage, `images/${file.name}`);

    // Inicia o upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitora progresso
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProguess(progress);
      },
      (error) => {
        console.error("Erro no upload:", error);
      },
      () => {
        // Quando terminar, pega URL
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addDoc(collection(db, "posts"), {
            titulo: tituloUpload,
            image: url,
            userName: user,
            timestamp: serverTimestamp()
          });

          setProguess(0);
          setFile(null);
        });
      }
    );
  }


  function criarConta(e) {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: username
        });
      })
      .then(() => {
        const modal = document.querySelector('.modalCriarConta');
        modal.style.display = 'none';
      })
      .catch((error) => {
        console.error("Erro ao criar conta:", error.message);
      });
  }

  function logar(e) {
    e.preventDefault();
    const email = document.querySelector('#email-login').value;
    const senha = document.querySelector('#password-login').value;

    signInWithEmailAndPassword(auth, email, senha)
      .then((auth) => {
        setUser(auth.user.displayName)
      })
      .catch((error) => {
        console.error("Erro ao criar conta:", error.message);
      });
  }

  return (
    <div className='header'>
      <div className='modalCriarConta'>
        <div className='formCriarConta'>
          <div className='closeModalCriar' onClick={(e) => fecharModalCriarConta(e)}>X</div>
          <h2>Criar Conta</h2>
          <form onSubmit={(e) => criarConta(e)}>
            <input id="email" type='text' placeholder='Seu e-mail...'></input>
            <input id="username" type='text' placeholder='Seu username...'></input>
            <input id="password" type='password' placeholder='Sua senha...'></input>
            <input type='submit' value='Criar Conta!'></input>
          </form>
        </div>
      </div>

      <div className='modalUpload'>
        <div className='formUpload'>
          <div className='closeModalCriar' onClick={(e) => fecharModalUpload(e)}>X</div>
          <h2>Fazer Upload</h2>
          <form onSubmit={(e) => uploadPost(e)}>
            <progress id="progress-upload" value={progress}></progress>
            <input id="titulo-upload" type='text' placeholder='Nome da sua foto...'></input>
            <input onChange={(e) => setFile(e.target.files[0])} type="file" name="file" />
            <input type='submit' value='Criar Conta!'></input>
          </form>
        </div>
      </div>
      <div className='center'>
        <div className='header__logo'>
          <h1>Instagram</h1>
        </div>
        {
          (user) ?
            <div className='header__logadoInfo'>
              <span>Olá, <b>{user}</b></span>
              <a onClick={(e) => abrirModalUpload(e)} href='#'>Postar!</a>
            </div> :
            <div className='header__loginForm'>
              <div className='login__wrapper'>
                <form onSubmit={(e) => logar(e)}>
                  <input id="email-login" type='text' placeholder='Login...'></input>
                  <input id="password-login" type='password' placeholder='Senha...'></input>
                  <input type='submit' name="acao" value="logar"></input>
                </form>
                <div className='btn__criarConta'>
                  <a href='#' onClick={(e) => abrirModalCriarConta(e)}>Criar conta!</a>
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default Header;