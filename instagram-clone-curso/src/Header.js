import { useState } from 'react';
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


function Header() {
  const [user, setUser] = useState(null);

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

  function criarConta(e) {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    console.log(email, username, password);

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
      <div className='center'>
        <div className='header__logo'>
          <h1>Instagram</h1>
        </div>
        {
          (user) ?
            <div className='header__logadoInfo'>
              <span>Olá, <b>{user}</b></span>
              <a href='#'>Postar!</a>
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