import styled from 'styled-components';

export const Container = styled.div`
width: 300px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
gap: 22px;

  * {
    width: 100%;
  }
  h1 {
    text-align: center;
  }
  p {
    text-align: center;
    font-size: 12px;
    color: grey;
  }
`;

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
//   padding: 5%;
`;
