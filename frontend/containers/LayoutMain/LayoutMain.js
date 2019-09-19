import PropTypes from 'prop-types';

import Footer from '../Footer/Footer';
import * as sc from './LayoutMain.style';

const LayoutMain = React.memo(props => (
  <sc.LayoutMain>
    <sc.AntHeader>{props.header}</sc.AntHeader>

    <sc.AntContent>{props.content}</sc.AntContent>

    <sc.AntFooter>
      <Footer />
    </sc.AntFooter>
  </sc.LayoutMain>
));

LayoutMain.defaultProps = {
  header: null,
  content: null
};

LayoutMain.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node
};

export default LayoutMain;
