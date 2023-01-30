import React, { useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { password as reduxPswrd, user } from '../redux/reducer/login';

const minLength = 6;
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setvalidate] = useState(false);

  const loginValidate = !(password.length >= minLength && EmailValidator.validate(email));
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = async (event) => {
    event.preventDefault();
    const URL = 'http://localhost:3001/user/login';
    const login = { email, password };
    try {
      const { data } = await axios.post(URL, login);
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(user(email));
      dispatch(reduxPswrd(password));
      if (data.role !== 'customer') {
        history.push('/seller/orders');
      }
      if (data.role === 'customer') {
        history.push('/customer/products');
      }
    } catch (err) {
      setvalidate(true);
      console.log(err);
    }
  };

  return (
    <div>
      <input
        type="email"
        data-testid="common_login__input-email"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
        placeholder="Email"
      />
      <input
        type="text"
        data-testid="common_login__input-password"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
        placeholder="Password"
      />
      <button
        type="button"
        data-testid="common_login__button-login"
        onClick={ handleClick }
        disabled={ loginValidate }
      >
        LOGIN
      </button>
      <Link to="/register">
        <button
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
      </Link>
      { validate
        && (
          <p data-testid="common_login__element-invalid-email">
            Dados inválidos
          </p>
        ) }
    </div>
  );
}

export default withRouter(Login);
