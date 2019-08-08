import PropTypes from 'prop-types';

import Header from '../Header/Header';
import * as sc from './Layout.style';

const Layout = React.memo(props => (
  <sc.divLayout>
    <sc.headerMarginLeft />

    <Header />

    <sc.headerMarginRight />

    {/* Pages are rendered here */}
    <sc.mainContainer>{props.children}</sc.mainContainer>
  </sc.divLayout>
));

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
