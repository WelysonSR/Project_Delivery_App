import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import NavBar from '../../components/NavBar';
import SellerOrdersCard from '../../components/SellerOrdersCard';
// import OrderDetailTable from '../components/OrderDetailsTable';
// import { Link } from 'react-router-dom';

export default function SellerOrderDetails() {
  const [details, setDetails] = useState(null);
  const [date, setDate] = useState('');
  const [user, setUser] = useState({});
  const [status, setStatus] = useState('Pendente');

  const { id: paramsId } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const { data } = await axios.get(`http://localhost:3001/sales/${paramsId}`);
      setDetails(data);
      const momentDate = moment(data.saleDate);
      setDate(momentDate.format('DD/MM/YYYY'));
      setUser(JSON.parse(localStorage.getItem('user')));
      setStatus(data.status);
    };
    getDetails();
  }, []);
  // return (<div> oi</div>);

  const changeStatus = async (param) => {
    const URL = `http://localhost:3001/sales/${paramsId}`;
    await axios.patch(URL, { status: param }, {
      headers: {
        Authorization: user.token,
      },
    });
    setStatus(param);
  };

  return (
    <div>
      <NavBar />
      {!details && <p>Loading...</p>}
      { details
    && (
      <>
        <div
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          <p>{ `Pedido ${paramsId}` }</p>
        </div>
        <h4
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { date }
        </h4>
        <h2
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { status }
        </h2>
        <button
          data-testid="seller_order_details__button-preparing-check"
          onClick={ () => changeStatus('Preparando') }
          disabled={ status !== 'Pendente' }
          type="button"
        >
          PREPARAR PEDIDO
        </button>
        <button
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ () => changeStatus('Em Trânsito') }
          disabled={ status !== 'Preparando' }
          type="button"
        >
          SAIU PARA ENTREGA
        </button>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
            </tr>
          </thead>

          <tbody>
            { details && details
              .products.map(({ id, name, salesProduct, price }, index) => (
                <tr key={ index }>
                  <td
                    data-testid={
                      `seller_order_details__element-order-table-item-number-${index}`
                    }
                  >
                    { id }
                  </td>
                  <td
                    data-testid={
                      `seller_order_details__element-order-table-name-${index}`
                    }
                  >
                    { name }
                  </td>
                  <td
                    data-testid={
                      `seller_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    { salesProduct.quantity }
                  </td>
                  <td
                    data-testid={
                      `seller_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    <span>R$ </span>
                    { price.toString().replace('.', ',') }
                  </td>
                  <td
                    data-testid={
                      `seller_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    <span>R$ </span>
                    { (Number(price) * Number(salesProduct.quantity)).toFixed(2)
                      .toString().replace('.', ',') }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <span>TOTAL: R$ </span>
        <span
          data-testid="seller_order_details__element-order-total-price"
        >
          { details.totalPrice.toString().replace('.', ',') }
        </span>
      </>
    )}
    </div>
  );
}

SellerOrdersCard.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.number,
  deliveryAddress: PropTypes.string,
  deliveryNumber: PropTypes.string,
}.isRequired;
