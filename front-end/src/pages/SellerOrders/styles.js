import styled from 'styled-components';

export const Main = styled.div`
display: flex;
align-items: center;
justify-content: center;
// flex-direction: column;
flex-wrap: wrap;
min-height: 80vh;
margin-top: 120px;
`;

export const OrdersCointainer = styled.div`
display: flex;
align-items: center;
flex-wrap: wrap;
width: 80%;
justify-content: center;
align-items: center;
gap: 3rem;
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
