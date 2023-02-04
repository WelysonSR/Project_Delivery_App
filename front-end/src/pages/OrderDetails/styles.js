import styled from 'styled-components';

export const Main = styled.div`
display: flex;
align-items: center;
margin-top: 120px;
// justify-content: space-around;
flex-direction: column;
height: 80vh;
gap: 10rem;
`;

export const CheckoutCointainer = styled.div`
display: flex;
align-items: center;
// justify-content: space-between;
gap: 13rem;
div {
    display: flex;
    flex-direction: column;
    // gap: 1rem;
    align-items: center;
    width: 40%;
    text-align: center;
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
