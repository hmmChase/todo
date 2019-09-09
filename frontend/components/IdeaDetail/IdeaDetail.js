import PropTypes from 'prop-types';
import Link from 'next/link';

import * as sc from './IdeaDetail.style';

const IdeaDetail = React.memo(props => (
  <sc.IdeaDetail>
    <Link href={{ pathname: '/' }}>
      <sc.backBtn>{'<- Back'}</sc.backBtn>
    </Link>
  </sc.IdeaDetail>
));

IdeaDetail.propTypes = {
  // id: PropTypes.string.isRequired
};

export default IdeaDetail;
