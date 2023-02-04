import { useEffect, useState } from 'react';
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { users as userRedux } from '../redux/reducer/login';

export default function NewUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [validate, setvalidate] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();

  const handleClick = async (event) => {
    event.preventDefault();
    const URL = 'http://localhost:3001/user/register-adm';
    const register = { name, email, password, role };

    try {
      await axios.post(URL, register, {
        headers: {
          Authorization: user.token,
        },
      });
      setCounter(counter + 1);
    } catch (err) {
      setvalidate(true);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('http://localhost:3001/user');
      dispatch(userRedux(data));
    };
    getUser();
  }, [counter]);

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

  return (
    <>
      { validate
        && (
          <p data-testid="admin_manage__element-invalid-register">
            Já existe este cadastro
          </p>
        ) }
      <form>
        <h4>Cadastro de Usuário</h4>
        <input
          type="text"
          name="name"
          placeholder="Name e sobrenome"
          data-testid="admin_manage__input-name"
          onChange={ ({ target }) => setName(target.value) }
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          data-testid="admin_manage__input-email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          data-testid="admin_manage__input-password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <select
          data-testid="admin_manage__select-role"
          name="role"
          onChange={ ({ target }) => setRole(target.value) }
          value={ role }
        >
          <option value="administrator">Administrator</option>
          <option value="seller" selected="selected">Vendedor</option>
          <option value="customer">Cliente</option>
        </select>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
          onClick={ handleClick }
          disabled={ !disabledBtn }
        >
          CADASTRAR
        </button>
      </form>
    </>
  );
}
