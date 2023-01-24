import React from 'react';

const elementInvalid = 'common_register___element-invalid_register';
const msgError = 'Já existe este cadastro';

export default function Register() {
  return (
    <main>
      <form>
        <h2>Cadastro</h2>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            placeholder="Seu nome"
            data-testid="common_register__input-name"
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            placeholder="seu-email@site.com.br"
            data-testid="common_register__input-email"
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            placeholder="**********"
            data-testid="common_register__input-password"
          />
        </label>

        <button
          type="button"
          data-testid="common_register__button-register"
        >
          CADASTRAR
        </button>
        <div hidden={ msgError }>
          <p>{elementInvalid}</p>
        </div>
      </form>
    </main>
  );
}
