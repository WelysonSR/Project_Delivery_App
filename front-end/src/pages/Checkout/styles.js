import styled from 'styled-components';

export const Main = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100vh;
`;

export const CheckoutCointainer = styled.div`
margin-top: 150px;
display: flex;
align-items: center;
justify-content: center;
gap: 40px;
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
`;
