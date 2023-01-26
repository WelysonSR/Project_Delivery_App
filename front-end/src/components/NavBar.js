import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const removeFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('carrinho');
  };
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
          to="/customer/orders"
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
