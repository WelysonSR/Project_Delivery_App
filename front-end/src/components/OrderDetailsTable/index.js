import React from 'react';
import PropTypes from 'prop-types';

export default function OrderDetailTable({ products }) {
  return (
    <table className="grid gap-3 text-center table table-light table-sm rounded">
      <thead className="table-danger">
        <tr>
          <th className="col px-md-3">Item</th>
          <th className="col px-md-5">Descrição</th>
          <th className="col px-md-3">Qtd</th>
          <th className="col px-md-3">Unitário</th>
          <th className="col px-md-3">Total</th>
        </tr>
      </thead>

      <tbody>
        { products.map(({ id, name, salesProduct, price }, index) => (
          <tr key={ name }>
            <td
              data-testid={
                `customer_order_details__element-order-table-item-number-${index}`
              }
            >
              { id }
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-item-number-${index}`
              }
            >
              { name }
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-quantity-${index}`
              }
            >
              { salesProduct.quantity }
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-unit-price-${index}`
              }
            >
              { price }
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-sub-total-${index}`
              }
            >
              { (Number(price) * salesProduct.quantity).toFixed(2) }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

OrderDetailTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
};
