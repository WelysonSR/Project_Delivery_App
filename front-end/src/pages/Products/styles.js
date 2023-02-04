import styled from 'styled-components';

export const Main = styled.div`
min-height: 100vh;
display: flex;
flex-wrap: wrap;
flex-direction: column;
justify-content: center;
align-items: center;

`;

export const ProductContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
width: 1000px;
gap: 10px;
margin-top: 110px;
margin-bottom: 50px;
`;

export const ProductCard = styled.div`
width: 200px;
height: 250px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 10px;
text-align: center;
img {
    height: 100px;
}
section {
    position: relative;
    top: -10px;
    right: 55px;
    width: 85px;
    height: 30px;
    text-align: center;
    color: white;
    z-index: -5;
}
p {
    width: 150px;
    height: 30px;
}
`;

export const ButtonProducts = styled.button`
width: 200px;
height: 250px;
`;

export const Inputs = styled.div`
text-align: center;

div {
    height: 50px;
    display: flex;
    justify-content: center;
    gap: 3%;
    align-items: center;
    input {
    text-align: center;
    width: 30%;
    height: 40px;
    }
    button {
    text-align: center;
    width: 20%;
    height: 40px;
    }
}
`;
