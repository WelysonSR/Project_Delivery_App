import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
// import OrderDetailTable from '../components/OrderDetailsTable';

export default function SellerOrderDetails() {
  const [details, setDetails] = useState();
  const { id: paramsId } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const { data } = await axios.get(`http://localhost:3001/sales/${paramsId}`);
      console.log(data);
      setDetails(data);
    };
    getDetails();
  }, [paramsId]);

  if (!details) {
    return (
      <>
        <NavBar />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <section>
      <NavBar />
      <p>{`${JSON.stringify(details)}`}</p>
    </section>
  );
}
