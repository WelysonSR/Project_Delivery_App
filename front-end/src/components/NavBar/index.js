import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkout } from '../../redux/reducer/products';
import { user as userRedux, password } from '../../redux/reducer/login';
import * as S from './styles';

export default function NavBar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [linkOrders, setLinkOrders] = useState('/customer/orders');
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState('');
  const history = useHistory();

  const removeFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('carrinho');
    dispatch(checkout([]));
    dispatch(userRedux(''));
    dispatch(password(''));
    history.push('/');
  };

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('user'));
    if (userLogin && userLogin?.role !== 'customer') {
      setLinkOrders('/seller/orders');
    }
    setAdmin(userLogin.role);
  }, []);

  return (
    <S.Header className="p-2 mb-1 bg-danger-subtle text-emphasis-danger">
      <S.LoginInfo>
        <img src="https://img.freepik.com/free-vector/way-concept-illustration_114360-1191.jpg?w=1380&t=st=1675524773~exp=1675525373~hmac=f64ba640cf5155329e381faa0e96192a31b363273ee9a769f9cbb20effd1f90e" alt="delivery app logo" className="rounded" />
        <section className="bg-light-subtle rounded p-2">
          <p>
            {user && user.role }
          </p>
          <p
            data-testid="customer_products__element-navbar-user-full-name"
            className="fw-bolder"
          >
            {user ? user.name : <Link to="/"> Faça Login!</Link>}
          </p>
        </section>
      </S.LoginInfo>
      <S.DivButtons>
        {
          admin === 'administrator' ? (
            <button
              data-testid="customer_products__element-navbar-link-orders"
              type="button"
              onClick={ () => history.push(linkOrders) }
            >
              GERENCIAR USUÁRIOS
            </button>
          ) : (
            <>
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={ () => history.push('/customer/products') }
                data-testid="customer_products__element-navbar-link-products"
              >
                Produtos
              </button>

              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={ () => history.push(linkOrders) }
                data-testid="customer_products__element-navbar-link-orders"
              >
                Meus Pedidos
              </button>
            </>
          )
        }
        <button
          className="btn btn-danger"
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => removeFromLocalStorage() }
        >
          Sair
        </button>
      </S.DivButtons>
    </S.Header>
  );
}
