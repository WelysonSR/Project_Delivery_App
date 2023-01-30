import React, { useState, useEffect } from 'react';
import api from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import OrderDatailTable from '../components/OrderDetailsTable';

export default function OrderDetails() {
  const [details, setDetails] = useState();
  const { id: paramsId } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const { data } = await api.get(`/sales/${paramsId}`);
      setDetails(data);
    };
    getDetails();
  }, [paramsId]);

  const deliveredSale = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.defaults.headers.common.Authorization = token;
    const { data } = await api.patch(`/sales/${paramsId}`, { status: 'Entregue' });
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
    <section>
      <NavBar />
      <h2>Detalhe do Pedido</h2>
      <div>
        <div>
          <p
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {`PEDIDO ${id}`}
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {`P. Vend: ${seller.name}`}
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { saleDate }
          </p>
          <p
            data-testid={
              `customer_order_details__element-order-details-label-delivery-status-${id}`
            }
          >
            { status }
          </p>
          <button
            type="button"
            disabled={ status !== 'Em Trânsito' }
            onClick={ deliveredSale }
            data-testid="customer_order_details__button-delivery-check"
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
        <OrderDatailTable products={ products } />
        <div>
          <span>TOTAL: R$ </span>
          <span
            data-testid="customer_order_details__element-order-total-price"
          >
            { totalPrice.toString().replace('.', ',') }
          </span>
        </div>
      </div>
    </section>
  );
}
