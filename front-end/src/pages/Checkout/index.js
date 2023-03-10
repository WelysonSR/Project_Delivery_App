import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../../components/NavBar';
import OrderTable from '../../components/OrderTable';
import * as S from './styles';

export default function Checkout() {
  const [seller, setSeller] = useState([]);
  const [address, setAddress] = useState('');
  const [api, setApi] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [number, setNumber] = useState(0);
  const [user, setUser] = useState({});

  const cart = useSelector(({ products }) => products.checkout);

  useEffect(() => {
    const getAxios = async () => {
      try {
        const URL = 'http://localhost:3001/user';
        const { data } = await axios.get(URL);
        const result = data.filter((u) => u.role === 'seller');
        setApi(result);
      } catch (err) {
        console.log(err);
      }
    };
    getAxios();
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const history = useHistory();

  const postAxios = async () => {
    try {
      const URL = 'http://localhost:3001/sales/';
      const obj = {
        products: cart.filter((product) => product.quantity > 0),
        userId: Number(user.id),
        sellerId: Number(seller.id) || Number(api[0].id),
        totalPrice: Number(totalPrice.replace(',', '.')),
        deliveryAddress: address,
        deliveryNumber: Number(number),
      };

      const { data } = await axios.post(URL, obj, {
        headers: {
          Authorization: user.token,
        },
      });
      const url = `/customer/orders/${data.id}`;
      history.push(url);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalPrice = () => {
    const total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total.toFixed(2).replace('.', ','));
  };

  useEffect(() => {
    getTotalPrice();
  }, [cart]);

  return (
    <>
      <Navbar />
      <S.Main>
        <S.CheckoutCointainer>
          <section>
            <OrderTable />
            <p
              className="fs-4 fw-light"
              data-testid="customer_checkout__element-order-total-price"
            >
              {`Total: R$ ${totalPrice}`}
            </p>
          </section>
          <form>
            <h4> Detalhes e Endere??o para Entrega </h4>
            <label htmlFor="vendedora" className="form-label">
              P. Vendedora Respons??vel:
              <select
                id="vendedora"
                className="form-select"
                data-testid="customer_checkout__select-seller"
                onChange={ ({ target }) => setSeller(target.value) }
                value={ api[0] }
              >
                { api.map((e, index) => (
                  <option
                    key={ index }
                    value={ e }
                  >
                    {e.name}
                  </option>
                ))}
                ;
              </select>
            </label>
            <label htmlFor="endere??o" className="form-label">
              Endere??o:
              <input
                className="form-control"
                type="text"
                id="endere??o"
                placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
                data-testid="customer_checkout__input-address"
                value={ address }
                onChange={ ({ target }) => setAddress(target.value) }
              />
            </label>

            <label htmlFor="address" className="form-label">
              N??mero:
              <input
                className="form-control"
                type="text"
                id="address"
                placeholder="198"
                data-testid="customer_checkout__input-address-number"
                onChange={ ({ target }) => setNumber(target.value) }
                value={ number }
              />
            </label>
            <button
              type="button"
              data-testid="customer_checkout__button-submit-order"
              onClick={ postAxios }
              className="btn btn-outline-success"
            >
              FINALIZAR PEDIDO
            </button>
          </form>
        </S.CheckoutCointainer>
      </S.Main>
    </>
  );
}
