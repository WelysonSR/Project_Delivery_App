import styled from 'styled-components';

export const Header = styled.header`
display: flex;
justify-content: space-evenly;
gap: 10%;
align-items: center;
position: fixed;
width: 100%;
margin-bottom: 50px;
button {
    width: 150px;
}
`;

export const LoginInfo = styled.div`
display: flex;
align-items: center;
width: 30%;
gap: 5%;
img {
    width: 130px;
}
section {
    height: 85px;
    width: 130px;
    text-align: center;
}
`;

export const DivButtons = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 40%;
`;
