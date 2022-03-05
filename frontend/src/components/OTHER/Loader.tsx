import styled from 'styled-components';

const Loader = () => <Loaderr />;

export default Loader;

const Loaderr = styled.div`
  animation: loader 2s infinite ease;
  border-radius: ${props => props.theme.borderRadius.primary};
  border: 3px solid ${props => props.theme.border.quinary};
  height: 30px;
  width: 30px;

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(90deg);
    }

    50% {
      transform: rotate(180deg);
    }

    75% {
      transform: rotate(270deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
