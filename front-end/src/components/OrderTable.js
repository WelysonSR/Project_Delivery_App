import React, { useState } from 'react';

const tableNumber = 'customer_checkout__element-order-table-item-number-';
const tableName = 'customer_checkout__element-order-table-name-';
const tableQuantity = 'customer_checkout__element-order-table-quantity-';
const tablePrice = 'customer_checkout__element-order-table-unit-price-';
const tableTotal = 'customer_checkout__element-order-table-sub-total-';
const tableRmv = 'customer_checkout__element-order-table-remove->';

export default function OrderTable() {
  const { generic, setGeneric } = useState();

  const columns = () => (
    <tr>
      <th>Item</th>
      <th>Descrição</th>
      <th>Quantidade</th>
      <th>Valor Unitário</th>
      <th>Sub-total</th>
    </tr>
  );

  const rmvItem = (item) => {
    const remover = generic
      .filter((e) => e.order !== Number(item));
    setGeneric(remover);
  };

  const rows = () => {
    if (generic.lenght !== undefined || generic.lenght !== 0) {
      return (generic.map((e, i) => (
        <tr key={ i }>
          <td data-testid={ `${tableNumber}${i}` }>{ i + 1 }</td>
          <td data-testid={ `${tableName}${i}` }>{e.name}</td>
          <td data-testid={ `${tableQuantity}${i}` }>{e.quantity}</td>
          <td data-testid={ `${tablePrice}${i}` }>{e.price}</td>
          <td data-testid={ `${tableTotal}${i}` }>{e.price * e.quantity}</td>
          <td>
            <button
              type="button"
              id="deleteBtn"
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
    <main>
      <h4> Finalizar Pedido </h4>
      <table>
        <thead>
          { columns() }
        </thead>
        <tbody>
          { rows() }
        </tbody>
      </table>
    </main>
  );
}
