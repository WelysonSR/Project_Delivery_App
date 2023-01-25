import React, { useState, useEffect } from 'react';
import api from 'axios';
import CardMeuPedidos from '../components/CardMeuPedido';
// import Header from '../components/Header';

export default function Orders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      const { data } = await api.get('http://localhost:3001/sales');
      setSales(data);
    };
    getSales();
  }, []);

  return (
    <section>
      {/* <Header /> */}
      {
        sales.map(({ id, status, data, price }) => (
          <CardMeuPedidos
            key={ id }
            id={ id }
            status={ status }
            data={ data }
            price={ price }
          />
        ))
      }
    </section>
  );
}
