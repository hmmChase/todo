import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
// import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../../../graphql/queries/user';
import * as sc from './Header.style';

const Header = props => {
  const { data } = useQuery(CURRENT_USER, { onError(_error) {} });

  return (
    <sc.Header>
      <sc.HeaderTitlee>{props.title}</sc.HeaderTitlee>

      {data && data.currentUser && (
        <div>
          <sc.Welcome>Welcome {data.currentUser.username}</sc.Welcome>

          <sc.SignOutBtnn />
        </div>
      )}

      <sc.Bottom>{props.children}</sc.Bottom>
    </sc.Header>
  );
};

Header.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string.isRequired
};

export default React.memo(Header);
