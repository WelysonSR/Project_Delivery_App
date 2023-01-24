import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import * as EmailValidator from 'email-validator';
// import regex from './Regex';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [validate, setvalidate] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const validation = () => {
      const characterSix = 6;
      const characterTwelve = 12;
      // const inputEmail = regex(email);
      const inputEmail = EmailValidator.validate(email);
      const inputName = name.length >= characterTwelve;
      const inputPassword = password.length >= characterSix;
      console.log(inputEmail, inputName, inputPassword);
      return (inputEmail && inputName && inputPassword);
    };
    setDisabledBtn(validation());
  }, [name, email, password]);

  const handleClick = async (event) => {
    event.preventDefault();
    const URL = 'http://localhost:3001/user/register';
    const register = { name, email, password };
    try {
      const { data } = await axios.post(URL, register);
      console.log(data);
      history.push('/customer/products');
    } catch (err) {
      setvalidate(true);
      console.log(err);
    }
  };

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
          onClick={ handleClick }

        >
          CADASTRAR
        </button>
        { validate
        && (
          <p data-testid="common_register___element-invalid_register">
            Já existe este cadastro
          </p>
        ) }
      </form>
    </main>
  );
}
