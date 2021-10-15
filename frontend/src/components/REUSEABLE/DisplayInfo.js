import styled from 'styled-components';

const DisplayInfo = props => {
  const { children } = props;

  return (
    <Wrapper>
      <span>{children}</span>
    </Wrapper>
  );
};

export default DisplayInfo;

const Wrapper = styled.div`
  padding: 4px;
  border: 1px solid #000;
  background-color: ${props => props.theme.statusDisplays.info.background};
  color: ${props => props.theme.statusDisplays.info.text};
  border-radius: ${props => props.theme.buttons.borderRadius};
`;
