import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLogo = styled.h1`
  color: ${props => props.theme.red};
`;

class Header extends React.PureComponent {
  render() {
    return (
      <header>
        <StyledLogo>next-graphql-starter</StyledLogo>
        {this.props.children}
      </header>
    );
  }
}

Header.propTypes = {
  children: PropTypes.node.isRequired
};

export default Header;
