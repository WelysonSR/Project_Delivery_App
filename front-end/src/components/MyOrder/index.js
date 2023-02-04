import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as S from './styles';

export default function MyOrder({ id, status, data, price }) {
  return (
    <S.OrderCard className="rounded shadow">
      <Link to={ `/customer/orders/${id}` }>
        <S.OrderDiv1>
          <p
            className="bg-light text-dark fs-3"
            data-testid={ `customer_orders__element-order-id-${id}` }
          >
            { `Pedido ${id}` }
          </p>
          <p
            className="bg-success-subtle text-emphasis-success fs-4"
            data-testid={ `customer_orders__element-delivery-status-${id}` }
          >
            { status }
          </p>
        </S.OrderDiv1>
        <S.OrderDiv2 className="bg-danger-subtle text-emphasis-danger">
          <p
            data-testid={ `customer_orders__element-order-date-${id}` }
          >
            { moment(data).format('DD/MM/YYYY') }
          </p>
          <p
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            { `R$ ${price.toString().replace('.', ',')}` }
          </p>
        </S.OrderDiv2>
      </Link>
    </S.OrderCard>
  );
}

MyOrder.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  data: PropTypes.string,
  price: PropTypes.number,
}.isRequired;
