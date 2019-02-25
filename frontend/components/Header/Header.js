import styled from 'styled-components';
import Nav from '../Nav/Nav';

const StyledLogo = styled.h1`
  color: ${props => props.theme.red};
`;

class Header extends React.PureComponent {
  render() {
    return (
      <header>
        <StyledLogo>next-graphql-starter</StyledLogo>
        <Nav />
      </header>
    );
  }
}

export default Header;
