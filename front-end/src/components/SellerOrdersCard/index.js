import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import * as S from './styles';

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
    <S.OrderCard className="rounded shadow">
      <Link to={ `/seller/orders/${id}` }>
        <S.OrderDiv3>
          <S.OrderDiv1>
            <p
              className="bg-light text-dark fs-3"
              data-testid={ `seller_orders
            __element-order-id-${id}` }
            >
              { `Pedido ${id}` }
            </p>
            <p
              className="bg-success-subtle text-emphasis-success fs-4"
              data-testid={ `seller_orders__element-delivery-status-${id}` }
            >
              { status }
            </p>
          </S.OrderDiv1>
          <S.OrderDiv2 className="bg-danger-subtle text-emphasis-danger">

            <p data-testid={ `seller_orders__element-order-date-${id}` }>
              { date }
            </p>
            <p data-testid={ `seller_orders__element-card-price-${id}` }>
              { `R$ ${totalPrice.replace('.', ',')}`}
            </p>
          </S.OrderDiv2>
        </S.OrderDiv3>
        <span data-testid={ `seller_orders__element-card-address-${id}` }>
          { `Endereço: ${deliveryAddress}, ${deliveryNumber}` }
        </span>
      </Link>
    </S.OrderCard>
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
