import PropTypes from 'prop-types';
import Header from '../Header/Header';
import * as sc from './Layout.style';

const Layout = React.memo(props => (
  <sc.divLayout snapshot="Layout">
    <sc.headerMarginLeft />

    <Header />

    <sc.headerMarginRight />

    {/* Pages are rendered here */}
    {props.children}
  </sc.divLayout>
));

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
