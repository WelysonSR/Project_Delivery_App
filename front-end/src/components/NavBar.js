import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkout } from '../redux/reducer/products';
import { user as userRedux, password } from '../redux/reducer/login';

export default function NavBar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [linkOrders, setLinkOrders] = useState('/customer/orders');
  const dispatch = useDispatch();

  const removeFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('carrinho');
    dispatch(checkout([]));
    dispatch(userRedux(''));
    dispatch(password(''));
  };

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('user'));
    if (userLogin && userLogin?.role !== 'customer') {
      setLinkOrders('/seller/orders');
    }
  }, []);

  return (
    <nav>
      <div>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </Link>
      </div>

      <div>
        <Link
          to={ linkOrders }
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </Link>
      </div>

      <div>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user ? user.name : <Link to="/"> Faça Login!</Link>}
        </p>
      </div>

      <Link to="/">
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => removeFromLocalStorage() }
        >
          Sair
        </button>
      </Link>
    </nav>
  );
}
