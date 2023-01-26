import React, { useState } from 'react';

const tableNumber = 'customer_checkout__element-order-table-item-number-';
const tableName = 'customer_checkout__element-order-table-name-';
const tableQuantity = 'customer_checkout__element-order-table-quantity-';
const tablePrice = 'customer_checkout__element-order-table-unit-price-';
const tableTotal = 'customer_checkout__element-order-table-sub-total-';
const tableRmv = 'customer_checkout__element-order-table-remove-';

export default function OrderTable() {
  const { setGeneric } = useState([]);
  const user = JSON.parse(localStorage.getItem('carrinho'));

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
    </tr>
  );

  const rmvItem = (itemId) => {
    const remover = removeFromLocalStorage
      .filter((e) => e.productId !== Number(itemId));
    setGeneric(remover);
  };

  const rows = () => {
    if (user.lenght !== 0 || user.lenght !== undefined) {
      return (user.map((e, i) => (
        <tr key={ i }>
          <td data-testid={ `${tableNumber}${i}` }>{i.itemNumber + 1}</td>
          <td data-testid={ `${tableName}${i}` }>{e.name}</td>
          <td data-testid={ `${tableQuantity}${i}` }>{e.quantity}</td>
          <td data-testid={ `${tablePrice}${i}` }>{e.unitPrice}</td>
          <td data-testid={ `${tableTotal}${i}` }>{e.subTotal}</td>
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
