import styled from 'styled-components';

export const HeaderDetail = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 10px;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 920px) {
    padding: 10px 0;
  }
`;

export const Title = styled.h1`
  font-size: 1rem;
  margin: 0;

  @media screen and (min-width: 550px) {
    font-size: 1.5rem;
  }

  @media screen and (min-width: 420px) {
    margin-left: 70px;
  }
`;
