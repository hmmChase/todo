import styled from 'styled-components';
import { Layout } from 'antd';

//! Mobile first

export const AntLayout = styled(Layout)`
  /* display: flex; */
  /* flex-direction: column; */
  /* min-height: 100vh; */
`;

export const AntHeader = styled(Layout.Header)`
  padding: 0;

  /* h1 { */
  /* font-family: 'Play', sans-serif; */
  /* letter-spacing: 0.05rem; */
  /* } */
`;

export const AntContent = styled(Layout.Content)`
  padding: 20px;
`;

export const AntFooter = styled(Layout.Footer)``;

export const Container = styled.div`
  /* display: flex; */
  /* justify-content: center; */

  @media screen and (min-width: 900px) {
    /* margin: auto; */
    /* max-width: 900px; */
  }
`;
