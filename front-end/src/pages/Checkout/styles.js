import styled from 'styled-components';

export const Main = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
flex-direction: column;
min-height: 80vh;
margin-top: 120px;
`;

export const CheckoutCointainer = styled.div`
display: flex;
align-items: center;
// justify-content: space-between;
gap: 13rem;
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 40%;
    * {
        width: 100%
    }
}

section {
    p {
        text-align: right;
    }
}
`;
