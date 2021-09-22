import styled from 'styled-components';

const DisplayLoading = () => (
  <Wrapper>
    <span>Loading...</span>
  </Wrapper>
);

export default DisplayLoading;

const Wrapper = styled.div`
  padding: 4px;
  border: 1px solid #000;
  background-color: ${props => props.theme.statusDisplays.loading.background};
  color: ${props => props.theme.statusDisplays.loading.text};
  border-radius: ${props => props.theme.buttons.borderRadius};
`;
