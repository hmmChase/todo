import styled from 'styled-components';

const StyledLogo = styled.h1`
  color: ${props => props.theme.red};
`;

class Header extends React.PureComponent {
  render() {
    return (
      <header>
        <StyledLogo>next-graphql-starter</StyledLogo>
      </header>
    );
  }
}

export default Header;
