import PropTypes from 'prop-types';
import Footer from '../../molecules/Footer/Footer';
import * as sc from './Layout.style';

const Layout = props => (
  <sc.AntLayout>
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
  </sc.AntLayout>
);

Layout.propTypes = {
  header: PropTypes.element,
  content: PropTypes.element
};

export default React.memo(Layout);
