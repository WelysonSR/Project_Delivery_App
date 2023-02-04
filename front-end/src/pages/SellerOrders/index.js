import React, { useState, useEffect } from 'react';
import api from 'axios';
import NavBar from '../../components/NavBar';
import SellerOrdersCard from '../../components/SellerOrdersCard';

export default function SellerOrders() {
  const [sales, setSales] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getSales = async () => {
      const { data } = await api.get('http://localhost:3001/sales');
      const filter = data.filter((sale) => sale.sellerId === user.id);
      setSales(filter);
    };
    getSales();
  }, []);

  return (
    <section>
      <NavBar />
      {
        sales.map(({
          id,
          status,
          saleDate,
          totalPrice,
          deliveryAddress,
          deliveryNumber,
        }) => (
          <SellerOrdersCard
            key={ id }
            id={ id }
            status={ status }
            saleDate={ saleDate }
            totalPrice={ totalPrice }
            deliveryAddress={ deliveryAddress }
            deliveryNumber={ deliveryNumber }
          />
        ))
      }
    </section>
  );
}
