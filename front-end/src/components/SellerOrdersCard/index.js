import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

export default function SellerOrdersCard({
  id,
  status,
  saleDate,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
}) {
  const [date, setDate] = useState('');

  useEffect(() => {
    const momentDate = moment(saleDate);
    setDate(momentDate.format('DD/MM/YYYY'));
  }, []);

  return (
    <Link to={ `/seller/orders/${id}` }>
      <div data-testid={ `seller_orders__element-order-id-${id}` }>
        <p>Pedido</p>
        { id }
      </div>
      <h2 data-testid={ `seller_orders__element-delivery-status-${id}` }>
        { status }
      </h2>
      <h4 data-testid={ `seller_orders__element-order-date-${id}` }>
        { date }
      </h4>
      <h4 data-testid={ `seller_orders__element-card-price-${id}` }>
        { `R$ ${totalPrice.replace('.', ',')}`}
      </h4>
      <h4 data-testid={ `seller_orders__element-card-address-${id}` }>
        { `${deliveryAddress}, ${deliveryNumber}` }
      </h4>
    </Link>
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
