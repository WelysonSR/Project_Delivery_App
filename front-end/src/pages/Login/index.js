import React, { useEffect, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { password as reduxPswrd, user } from '../../redux/reducer/login';
import * as S from './styles';

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
      if (data.role === 'administrator') {
        return history.push('/admin/manage');
      }
      if (data.role === 'customer') {
        return history.push('/customer/products');
      }
      if (data.role !== 'customer') {
        return history.push('/seller/orders');
      }
    } catch (err) {
      setvalidate(true);
      console.log(err);
    }
  };

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('user'));
    if (userLogin && userLogin?.role === 'customer') {
      history.push('/customer/products');
    }
  }, []);

  return (
    <S.Main>
      <S.Container className="shadow p-3 mb-5 bg-body-tertiary rounded">
        <img src="https://img.freepik.com/free-vector/way-concept-illustration_114360-1191.jpg?w=1380&t=st=1675524773~exp=1675525373~hmac=f64ba640cf5155329e381faa0e96192a31b363273ee9a769f9cbb20effd1f90e" alt="delivery app logo" />
        <h1 className="fs-1 fw-lighter"> Delivery App</h1>
        <input
          type="email"
          data-testid="common_login__input-email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="Email"
          className="form-control"
        />
        <input
          type="text"
          data-testid="common_login__input-password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="Password"
          className="form-control"
        />
        <button
          type="button"
          data-testid="common_login__button-login"
          onClick={ handleClick }
          disabled={ loginValidate }
          className="btn btn-danger"
        >
          LOGIN
        </button>
        <Link to="/register">
          <button
            type="button"
            data-testid="common_login__button-register"
            className="btn btn-danger"

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
      </S.Container>
    </S.Main>
  );
}

export default withRouter(Login);
