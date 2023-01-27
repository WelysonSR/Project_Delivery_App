import React, { useEffect, useState } from 'react';

const tableNumber = 'customer_checkout__element-order-table-item-number-';
const tableName = 'customer_checkout__element-order-table-name-';
const tableQuantity = 'customer_checkout__element-order-table-quantity-';
const tablePrice = 'customer_checkout__element-order-table-unit-price-';
const tableTotal = 'customer_checkout__element-order-table-sub-total-';
const tableRmv = 'customer_checkout__element-order-table-remove-';

export default function OrderTable() {
  const [setGeneric] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = () => {
      const carrinho = JSON.parse(localStorage.getItem('carrinho'));
      const resut = carrinho.filter((item) => item.quantity > 0);
      setProduct(resut);
    };
    getProduct();
  }, []);

  const removeFromLocalStorage = () => {
    localStorage.removeItem(`${i}`);
  };

  const columns = () => (
    <tr>
      <th>Item</th>
      <th>Descrição</th>
      <th>Quantidade</th>
      <th>Valor Unitário</th>
      <th>Sub-total</th>
      <th>Remover Item</th>
    </tr>
  );

  const rmvItem = (itemId) => {
    const remover = removeFromLocalStorage
      .filter((e) => e.productId !== Number(itemId));
    setGeneric(remover);
  };

  const rows = () => {
    if (product.lenght !== 0 || product.lenght !== undefined) {
      return (product.map((e, i) => (
        <tr key={ i }>
          <td data-testid={ `${tableNumber}${i}` }>{e.id}</td>
          <td data-testid={ `${tableName}${i}` }>{e.name}</td>
          <td data-testid={ `${tableQuantity}${i}` }>{e.quantity}</td>
          <td data-testid={ `${tablePrice}${i}` }>{e.price}</td>
          <td data-testid={ `${tableTotal}${i}` }>
            {e.quantity * e.price}
          </td>
          <td>
            <button
              type="button"
              data-testid={ `${tableRmv}${i}` }
              onClick={ rmvItem }
            >
              Remover
            </button>
          </td>
        </tr>
      ))
      );
    }
  };

  return (
    <div>
      <h4> Finalizar Pedido </h4>
      <table>
        <thead>
          { columns() }
        </thead>
        <tbody>
          { rows() }
        </tbody>
      </table>
    </div>
  );
}
