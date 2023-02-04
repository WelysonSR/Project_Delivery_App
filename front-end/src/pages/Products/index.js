import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { checkout as checkoutRedux } from '../../redux/reducer/products';
import NavBar from '../../components/NavBar';
import * as S from './styles';

function Products() {
  const [api, setApi] = useState([]);
  const history = useHistory();

  const dispatch = useDispatch();

  const cart = useSelector(({ products }) => products.checkout);
  const validate = cart.length > 1;

  const getAxios = async () => {
    try {
      const URL = 'http://localhost:3001/product';
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
    localStorage.setItem('carrinho', JSON.stringify(products));
    dispatch(checkoutRedux(products));
  };

  useEffect(() => {
    getAxios();
  }, []);

  useEffect(() => {
    const cartLocalSt = JSON.parse(localStorage.getItem('carrinho'));
    if (!cartLocalSt || cartLocalSt.length === 0) {
      getEmpyCart();
    } else {
      dispatch(checkoutRedux(cartLocalSt));
    }
  }, [api]);

  const changeProduct = (value, id) => {
    if (value === '+') {
      const filter = cart.filter((drink) => drink.id !== id);
      const newCart = cart.find((drink) => drink.id === id);
      const newObj = {
        id: newCart.id,
        name: newCart.name,
        price: newCart.price,
        quantity: newCart.quantity + 1,
      };
      dispatch(checkoutRedux([...filter, newObj]));
      localStorage.setItem('carrinho', JSON.stringify([...filter, newObj]));
    }
    if (value === '-') {
      const filter = cart.filter((drink) => drink.id !== id);
      const newCart = cart.find((drink) => drink.id === id);
      if (newCart.quantity > 0) {
        const newObj = {
          id: newCart.id,
          name: newCart.name,
          price: newCart.price,
          quantity: newCart.quantity - 1,
        };
        dispatch(checkoutRedux([...filter, newObj]));
        localStorage.setItem('carrinho', JSON.stringify([...filter, newObj]));
      }
    }
  };

  const changeProductInput = (value, id) => {
    const filter = cart.filter((drink) => drink.id !== id);
    const newCart = cart.find((drink) => drink.id === id);
    const newObj = {
      id: newCart.id,
      name: newCart.name,
      price: newCart.price,
      quantity: Number(value),
    };
    dispatch(checkoutRedux([...filter, newObj]));
    localStorage.setItem('carrinho', JSON.stringify([...filter, newObj]));
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
      <NavBar />
      <S.Main>
        <S.ProductContainer>
          {api.map((product) => (
            <S.ProductCard
              key={ product.id }
              className="rounded border border-success border-opacity-25"
            >
              <section
                className="bg-success text-emphasis-succes rounded"
                data-testid={ `customer_products__element-card-price-${product.id}` }
              >
                <span className="fs-5">
                  { (`R$ ${product.price.replace('.', ',')}`) }
                </span>
              </section>
              <img
                className="productImg"
                data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                src={ product.urlImage }
                alt={ `${product.name} imagem` }
              />
              <p data-testid={ `customer_products__element-card-title-${product.id}` }>
                {product.name}
              </p>
              <S.Inputs>
                <div>
                  <button
                    className="btn btn-light"
                    data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                    type="button"
                    onClick={ () => changeProduct('-', product.id) }
                  >
                    -
                  </button>
                  <input
                    className="form-control"
                    value={ validate && getQuantity(product.id) }
                    onChange={ (e) => changeProductInput(e.target.value, product.id) }
                    data-testid={ `customer_products__input-card-quantity-${product.id}` }
                  />
                  <button
                    className="btn btn-light"
                    data-testid={ `customer_products__button-card-add-item-
                    ${product.id}` }
                    type="button"
                    onClick={ () => changeProduct('+', product.id) }
                  >
                    +
                  </button>
                </div>
              </S.Inputs>
            </S.ProductCard>
          ))}
          <S.ButtonProducts
            type="button"
            data-testid="customer_products__button-cart"
            onClick={ () => history.push('/customer/checkout') }
            disabled={ validate && getTotalPrice() === 0.00 }
            className="btn btn-outline-success"
          >
            <p className="fs-1" data-testid="customer_products__checkout-bottom-value">
              {validate && `R$ ${(getTotalPrice()).toFixed(2).replace('.', ',')}` }
            </p>
            <p className="fs-4 fw-lighter">carrinho</p>
          </S.ButtonProducts>
        </S.ProductContainer>
      </S.Main>
    </>
  );
}

export default withRouter(Products);
