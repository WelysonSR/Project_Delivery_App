import React, { useState, useEffect } from 'react';
import api from 'axios';
import MyOrder from '../../components/MyOrder';
import NavBar from '../../components/NavBar';
import * as S from './styles';

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
    <>
      <NavBar />
      <S.Main>
        <S.OrdersCointainer>
          {
            sales.map(({ id, status, saleDate, totalPrice }) => (
              <MyOrder
                key={ id }
                id={ id }
                status={ status }
                data={ saleDate }
                price={ totalPrice }
              />
            ))
          }
        </S.OrdersCointainer>
      </S.Main>
    </>
  );
}
