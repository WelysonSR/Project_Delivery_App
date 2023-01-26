import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function MyOrder({ id, status, data, price }) {
  return (
    <Link to={ `/customer/orders/${id}` }>
      <div data-testid={ `customer_orders__element-order-id-${id}` }>
        <p>Pedido</p>
        { id }
      </div>
      <h2 data-testid={ `customer_orders__element-delivery-status-${id}` }>
        { status }
      </h2>
      <h4 data-testid={ `customer_orders__element-order-date-${id}` }>
        { data }
      </h4>
      <h4 data-testid={ `customer_orders__element-card-price-${id}` }>
        { price.toString().replace('.', ',') }
      </h4>
    </Link>
  );
}

MyOrder.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  data: PropTypes.string,
  price: PropTypes.number,
}.isRequired;
