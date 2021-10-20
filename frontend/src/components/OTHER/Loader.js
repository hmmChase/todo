import styled from 'styled-components';

const Loader = styled.div`
  animation: spin 2s linear infinite;
  border-radius: 50%;
  border-top: 8px solid ${props => props.theme.border.secondary};
  border: 8px solid ${props => props.theme.border.tertiary};
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  width: 40px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
