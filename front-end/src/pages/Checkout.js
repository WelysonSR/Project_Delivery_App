import React from 'react';
import Navbar from '../components/NavBar';

export default function Checkout() {
  return (
    <main>
      <Navbar />
      <form>
        <p data-testid="customer_checkout__element-order-total-price">
          Total:
        </p>

        <h4> Detalhes e Endereço para Entrega </h4>

        <label htmlFor="vendedora">
          P. Vendedora Responsável:
          <select
            id="vendedora"
            data-testid="customer_checkout__select-seller"
          >
            <option> Fulana Pereira </option>
          </select>
        </label>

        <label htmlFor="endereço">
          Endereço:
          <input
            type="text"
            id="endereço"
            placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            data-testid="customer_checkout__input-address"
          />
        </label>

        <label htmlFor="address">
          Número:
          <input
            type="text"
            id="address"
            placeholder="198"
            data-testid="customer_checkout__input-address-number"
          />
        </label>

        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </main>
  );
}
