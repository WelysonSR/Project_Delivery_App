import React, { useEffect, useState } from 'react';

const tableNumber = 'customer_checkout__element-order-table-item-number-';
const tableName = 'customer_checkout__element-order-table-name-';
const tableQuantity = 'customer_checkout__element-order-table-quantity-';
const tablePrice = 'customer_checkout__element-order-table-unit-price-';
const tableTotal = 'customer_checkout__element-order-table-sub-total-';
const tableRmv = 'customer_checkout__element-order-table-remove-';

export default function OrderTable() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = () => {
      const carrinho = JSON.parse(localStorage.getItem('carrinho'));
      const resut = carrinho.filter((item) => item.quantity > 0);
      setProduct(resut);
    };
    getProduct();
  }, []);

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
    const remover = product
      .filter((e) => e.productId !== Number(itemId));
    setProduct(remover);
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
    if (product.lenght !== 0 || product.lenght !== undefined) {
      return (product.map((e, i) => (
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
              id={ e.productId }
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
