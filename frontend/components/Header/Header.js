import PropTypes from 'prop-types';
import * as sc from './Header.style';

const Header = React.memo(props => (
  <sc.header>
    <sc.h1>next-graphql-starter</sc.h1>

    {props.children}
  </sc.header>
));

Header.propTypes = {
  children: PropTypes.node.isRequired
};

export default Header;
