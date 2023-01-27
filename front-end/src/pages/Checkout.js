import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/NavBar';
import OrderTable from '../components/OrderTable';

export default function Checkout() {
  const { seller, setSeller } = useState('');
  const [api, setApi] = useState([]);
  const [product, setProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getAxios = async () => {
      try {
        const URL = 'http://localhost:3001/user';
        const { data } = await axios.get(URL);
        const resut = data.filter((user) => user.role === 'seller');
        setApi(resut);
      } catch (err) {
        console.log(err);
      }
    };
    getAxios();
    const getProduct = () => {
      const carrinho = JSON.parse(localStorage.getItem('carrinho'));
      const resut = carrinho.filter((item) => item.quantity > 0);
      setProduct(resut);
    };
    getProduct();
  }, []);

  const history = useHistory();

  const selectSeller = () => {
    const item = api.map((e, index) => (
      <option
        key={ index }
        value={ `${e.id}` }
      >
        {e.name}
      </option>
    ));
    return item;
  };

  const redirectToCustomerOrders = (id) => {
    url = `/customers/orders${id}`;
    history.push(url);
  };

  const saleStatus = () => {
    const item = {
      status: 'Pendente',
    };
    redirectToCustomerOrders(item);
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    setProduct(carrinho);
  };

  const getTotalPrice = () => {
    const total = product.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total.toFixed(2).replace('.', ','));
  };

  useEffect(() => {
    getTotalPrice();
  }, [OrderTable, getTotalPrice]);

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
            value={ seller }
            onChange={ ({ target }) => setSeller(target.value) }
          >
            { selectSeller() }
          </select>
        </label>

        <label htmlFor="endereço">
          Endereço:
          <input
            type="text"
            id="endereço"
            placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            data-testid="customer_checkout__input-address"
          />
        </label>

        <label htmlFor="address">
          Número:
          <input
            type="text"
            id="address"
            placeholder="198"
            data-testid="customer_checkout__input-address-number"
          />
        </label>

        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ saleStatus }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </main>
  );
}
