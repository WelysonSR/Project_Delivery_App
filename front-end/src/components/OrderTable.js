import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkout as checkoutRedux } from '../redux/reducer/products';

const tableNumber = 'customer_checkout__element-order-table-item-number-';
const tableName = 'customer_checkout__element-order-table-name-';
const tableQuantity = 'customer_checkout__element-order-table-quantity-';
const tablePrice = 'customer_checkout__element-order-table-unit-price-';
const tableTotal = 'customer_checkout__element-order-table-sub-total-';
const tableRmv = 'customer_checkout__element-order-table-remove-';

export default function OrderTable() {
  const dispatch = useDispatch();
  const cart = useSelector(({ products }) => products.checkout);

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
    const filter = cart.filter((drink) => drink.id !== +itemId);
    const newproduct = cart.find((drink) => drink.id === +itemId);
    const newObj = {
      id: newproduct.id,
      name: newproduct.name,
      price: newproduct.price,
      quantity: 0,
    };
    localStorage.setItem('carrinho', JSON.stringify([...filter, newObj]));
    dispatch(checkoutRedux([...filter, newObj]));
  };

  const itemRound = (value) => {
    const newItem = Math.round((value) * 100) / 100;
    return newItem.toFixed(2);
  };

  const convert = (value) => {
    const item = `Total: ${value}`;
    return item.replace('.', ',');
  };

  const rows = () => {
    if (cart.length !== 0 || cart.length !== undefined) {
      return (cart.filter((item) => item.quantity > 0).map((e, i) => (
        <tr key={ i }>
          <td data-testid={ `${tableNumber}${i}` }>{i + 1}</td>
          <td data-testid={ `${tableName}${i}` }>{e.name}</td>
          <td data-testid={ `${tableQuantity}${i}` }>{e.quantity}</td>
          <td data-testid={ `${tablePrice}${i}` }>{ convert(itemRound(e.price)) }</td>
          <td data-testid={ `${tableTotal}${i}` }>
            {convert(itemRound(e.quantity * e.price))}
          </td>
          <td>
            <button
              type="button"
              data-testid={ `${tableRmv}${i}` }
              id={ e.id }
              onClick={ (event) => rmvItem(event.target.id) }
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
