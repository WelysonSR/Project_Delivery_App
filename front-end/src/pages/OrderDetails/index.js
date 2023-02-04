import React, { useState, useEffect } from 'react';
import api from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import NavBar from '../../components/NavBar';
import OrderDatailTable from '../../components/OrderDetailsTable';
import * as S from './styles';

export default function OrderDetails() {
  const [details, setDetails] = useState();
  const { id: paramsId } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const { data } = await api.get(`http://localhost:3001/sales/${paramsId}`);
      setDetails(data);
    };
    getDetails();
  }, [paramsId]);

  const deliveredSale = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.defaults.headers.common.Authorization = token;
    const { data } = await api.patch(`http://localhost:3001/sales/${paramsId}`, { status: 'Entregue' });
    setDetails(data);
  };

  if (!details) {
    return (
      <>
        <NavBar />
        <p>Loading...</p>
      </>
    );
  }

  const {
    id,
    seller,
    saleDate,
    totalPrice,
    status,
    products,
  } = details;

  return (
    <>
      <NavBar />
      <S.Main>
        <S.CheckoutCointainer>
          <section>
            <h2>Detalhe do Pedido</h2>
            <OrderDatailTable products={ products } />
            <p
              className="fs-4 fw-light"
              data-testid="customer_order_details__element-order-total-price"
            >
              {`Total: R$ ${totalPrice}`}
            </p>
          </section>
          <div className="mb-5 bg-body-tertiary rounded">
            <p
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {`PEDIDO ${id}`}
            </p>
            <p
              data-testid="customer_order
              _details__element-order-details-label-seller-name"
            >
              {`P. Vend: ${seller.name}`}
            </p>
            <p
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              { `Realizado em: ${moment(saleDate).format('DD/MM/YYYY')}` }
            </p>
            <p
              data-testid={
                `customer_order_details
                __element-order-details-label-delivery-status-${id}`
              }
            >
              { `Status: ${status}` }
            </p>
            <button
              type="button"
              className="btn btn-danger"
              disabled={ status !== 'Em Trânsito' }
              onClick={ deliveredSale }
              data-testid="customer_order_details__button-delivery-check"
            >
              MARCAR COMO ENTREGUE
            </button>
          </div>
        </S.CheckoutCointainer>

      </S.Main>
    </>
  );
}
