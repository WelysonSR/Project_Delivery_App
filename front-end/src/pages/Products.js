import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/NavBar';

function Products() {
  const [api, setApi] = useState([]);
  const [cart, setCart] = useState([]);
  const history = useHistory();

  const validate = cart.length > 1;

  const getAxios = async () => {
    try {
      const URL = 'http://localhost:3001/products';

      const { data } = await axios.get(URL);
      setApi(data);
      history.push('/customer/products');
    } catch (err) {
      console.log(err);
    }
  };

  const getEmpyCart = () => {
    const products = api.map((product) => ({
      id: product.id,
      name: product.name,
      price: (+product.price),
      quantity: 0,
    }));
    setCart(products);
  };

  useEffect(() => {
    getAxios();
  }, []);

  useEffect(() => {
    const teste = JSON.parse(localStorage.getItem('carrinho'));
    console.log(teste);
    if (!teste) {
      getEmpyCart();
    } else {
      setCart(teste);
    }
  }, [api]);

  const changeProduct = (value, id) => {
    if (value === '+') {
      const filter = cart.filter((drink) => drink.id !== id);
      const newCart = cart.find((drink) => drink.id === id);
      newCart.quantity += 1;
      setCart([...filter, newCart]);
    }
    if (value === '-') {
      const filter = cart.filter((drink) => drink.id !== id);
      const newCart = cart.find((drink) => drink.id === id);
      if (newCart.quantity > 0) {
        newCart.quantity -= 1;
      }
      setCart([...filter, newCart]);
    }
    localStorage.setItem('carrinho', JSON.stringify(cart));
  };

  const changeProductInput = (value, id) => {
    const filter = cart.filter((drink) => drink.id !== id);
    const newCart = cart.find((drink) => drink.id === id);
    newCart.quantity = value;
    setCart([...filter, newCart]);
  };

  const getQuantity = (id) => {
    const { quantity } = cart.find((drink) => drink.id === id);
    return quantity;
  };

  const getTotalPrice = () => {
    const total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    return total;
  };

  return (
    <>
      <Navbar />

      <div className="products">
        {api.map((product) => (
          <div key={ product.id }>
            <p data-testid={ `customer_products__element-card-title-${product.id}` }>
              {product.name}
            </p>
            <span>R$ </span>
            <span data-testid={ `customer_products__element-card-price-${product.id}` }>
              { (product.price.replace('.', ',')) }
            </span>
            <br />
            <img
              className="productImg"
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              src={ product.urlImage }
              alt={ `${product.name} imagem` }
            />
            <div>
              <button
                data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                type="button"
                onClick={ () => changeProduct('-', product.id) }
              >
                -
              </button>
              <input
                value={ validate && getQuantity(product.id) }
                onChange={ (e) => changeProductInput(e.target.value, product.id) }
                data-testid={ `customer_products__input-card-quantity-${product.id}` }
              />
              <button
                data-testid={ `customer_products__button-card-add-item-${product.id}` }
                type="button"
                onClick={ () => changeProduct('+', product.id) }
              >
                +
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => history.push('/customer/checkout') }
          disabled={ validate && getTotalPrice() === 0.00 }
        >
          <p>Ver Carrinho:</p>
          <p data-testid="customer_products__checkout-bottom-value">
            {validate && (getTotalPrice()).toFixed(2).replace('.', ',')}
          </p>
        </button>
      </div>
    </>
  );
}

export default withRouter(Products);
