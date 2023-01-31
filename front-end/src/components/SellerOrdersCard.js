import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// import { Link } from 'react-router-dom';
import moment from 'moment/moment';

export default function SellerOrdersCard({ details }) {
  const [date, setDate] = useState('');
  const [user, setUser] = useState({});
  const [status, setStatus] = useState('Pendente');

  const {
    id: orderId,
    // userId,
    // sellerId,
    totalPrice,
    // deliveryAddress,
    // deliveryNumber,
    saleDate,
    status: orderStatus,
    // user,
    products,
  } = details;

  useEffect(() => {
    const momentDate = moment(saleDate);
    setDate(momentDate.format('DD/MM/YYYY'));
    setUser(JSON.parse(localStorage.getItem('user')));
    setStatus(orderStatus);
  }, []);

  const changeStatus = async (param) => {
    const URL = `http://localhost:3001/sales/${orderId}`;
    await axios.patch(URL, { status: param }, {
      headers: {
        Authorization: user.token,
      },
    });
    setStatus(param);
  };

  return (
    <div>
      <div
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        <p>{ `Pedido ${orderId}` }</p>
      </div>
      <h4 data-testid="seller_order_details__element-order-details-label-order-date">
        { date }
      </h4>
      <h2 data-testid="seller_order_details__element-order-details-label-delivery-status">
        { status }
      </h2>
      <button
        data-testid="seller_order_details__element-order-details-label-delivery-status"
        onClick={ () => changeStatus('Preparando') }
        type="button"
      >
        PREPARAR PEDIDO
      </button>
      <button
        data-testid="seller_order_details__button-dispatch-check"
        onClick={ () => changeStatus('Em Trânsito') }
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
          { products.map(({ id, name, salesProduct, price }, index) => (
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
        { totalPrice.toString().replace('.', ',') }
      </span>
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
