import PropTypes from 'prop-types';

import Footer from '../Footer/Footer';
import * as sc from './LayoutMain.style';

const LayoutMain = React.memo(props => (
  <sc.LayoutMain>
    <sc.AntHeader>
      <sc.Container>{props.header}</sc.Container>
    </sc.AntHeader>

    <sc.AntContent>
      <sc.Container>{props.content}</sc.Container>
    </sc.AntContent>

    <sc.AntFooter>
      <sc.Container>
        <Footer />
      </sc.Container>
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
