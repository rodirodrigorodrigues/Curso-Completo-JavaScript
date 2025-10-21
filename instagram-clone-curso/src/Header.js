import { useEffect, useState } from 'react';

function Header() {
  const [user, setUser] = useState(null);

  function abrirModalCriarConta(e) {
    e.preventDefault();
    alert('Fuminante!');
  }

  return (
    <div className='header'>
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
                <form>
                  <input type='text' placeholder='Login...'></input>
                  <input type='password' placeholder='Senha...'></input>
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