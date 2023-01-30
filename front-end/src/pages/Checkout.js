import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../components/NavBar';
import OrderTable from '../components/OrderTable';

export default function Checkout() {
  const [seller, setSeller] = useState('');
  const [address, setAddress] = useState('');
  const [api, setApi] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [number, setNumber] = useState(0);

  const cart = useSelector(({ products }) => products.checkout);
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const getAxios = async () => {
      try {
        const URL = 'http://localhost:3001/user';
        const { data } = await axios.get(URL);
        const result = data.filter((user) => user.role === 'seller');
        setApi(result);
        setSeller(result[0])
      } catch (err) {
        console.log(err);
      }
    };
    getAxios();
  }, []);


  const postAxios = async () => {
    try {
      const URL = `http://localhost:3001/sales/`;
      const obj = {
        user_id: user.id,
        seller_id: seller.id,
        total_price: Number(totalPrice.replace(',', '.')),
        delivery_address: address,
        delivery_number: number,
      }
      const { data } = await axios.post(URL, obj);
      console.log(data);
      // const url = `/customers/orders${data.id}`;
      // history.push(url);

    } catch (err) {
      console.log(err);
    }
  };

  const history = useHistory();

  const selectSeller = () => {
    const item = api.map((e, index) => (
      <option
        key={index}
        value={`${e.id}`}
      >
        {e.name}
      </option>
    ));
    return item;
  };


  const getTotalPrice = () => {
    const total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total.toFixed(2).replace('.', ','));
  };

  useEffect(() => {
    getTotalPrice();
  }, [cart]);

  return (
    <main>
      <Navbar />
      <OrderTable />
      <form>
        <p data-testid="customer_checkout__element-order-total-price">
          {totalPrice}
        </p>

        <h4> Detalhes e Endereço para Entrega </h4>

        <label htmlFor="vendedora">
          P. Vendedora Responsável:
          <select
            id="vendedora"
            data-testid="customer_checkout__select-seller"
            value={seller}
            onChange={({ target }) => setSeller(target.value)}
          >
            {selectSeller()}
          </select>
        </label>

        <label htmlFor="endereço">
          Endereço:
          <input
            type="text"
            id="endereço"
            placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            data-testid="customer_checkout__input-address"
            value={address}
            onChange={({ target }) => setAddress(target.value)}
          />
        </label>

        <label htmlFor="address">
          Número:
          <input
            type="text"
            id="address"
            placeholder="198"
            data-testid="customer_checkout__input-address-number"
            onChange={({ target }) => setNumber(target.value)}
            value={number}
          />
        </label>

        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={postAxios}
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </main>
  );
}
