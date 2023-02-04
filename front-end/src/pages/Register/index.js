import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import * as EmailValidator from 'email-validator';
import * as S from './styles';

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
      const inputEmail = EmailValidator.validate(email);
      const inputName = name.length >= characterTwelve;
      const inputPassword = password.length >= characterSix;
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
      localStorage.setItem('user', JSON.stringify(data));
      history.push('/customer/products');
    } catch (err) {
      setvalidate(true);
    }
  };

  return (
    <S.Main>
      <S.Container className="shadow p-3 mb-5 bg-body-tertiary rounded">
        <h1 className="fs-1 fw-lighter">Cadastro</h1>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            placeholder="Seu nome"
            data-testid="common_register__input-name"
            value={ name }
            className="form-control"
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
            className="form-control"
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
            className="form-control"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ !disabledBtn }
          onClick={ handleClick }
          className="btn btn-danger"

        >
          CADASTRAR
        </button>
        { validate
        && (
          <p data-testid="common_register__element-invalid_register">
            Já existe este cadastro
          </p>
        ) }
      </S.Container>
    </S.Main>
  );
}
