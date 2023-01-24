import React, { useState, useEffect } from 'react';
import regex from './Regex';

const elementInvalid = 'common_register___element-invalid_register';
const msgError = 'Já existe este cadastro';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState('');

  useEffect(() => {
    const validation = () => {
      const characterSix = 6;
      const characterTwelve = 12;
      const inputEmail = regex(email);
      const inputName = name.length >= characterTwelve;
      const inputPassword = password.length >= characterSix;
      return (inputEmail && inputName && inputPassword);
    };
    setDisabledBtn(validation());
  }, [name, email, password]);

  return (
    <main>
      <form>
        <h2>Cadastro</h2>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            placeholder="Seu nome"
            data-testid="common_register__input-name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            placeholder="seu-email@site.com.br"
            data-testid="common_register__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            placeholder="**********"
            data-testid="common_register__input-password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ !disabledBtn }
        >
          CADASTRAR
        </button>
        <div hidden={ msgError }>
          <p>{elementInvalid}</p>
        </div>
      </form>
    </main>
  );
}
