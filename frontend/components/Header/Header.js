import styled from 'styled-components';

const StyledHeader = styled.header`
  h1 {
    text-align: center;
    color: ${props => props.theme.red};
  }
`;

class Header extends React.PureComponent {
  render() {
    return (
      <StyledHeader>
        <h1>next-graphql-starter</h1>
      </StyledHeader>
    );
  }
}

export default Header;
