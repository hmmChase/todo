import PropTypes from 'prop-types';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import SignOut from './SignOut';

const Header = (props) => {
  const { data } = useQuery(CURRENT_USER, { onError(_error) {} });

  return (
    <>
      {data && data.currentUser && (
        <nav>
          <Link href='/'>
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href='/users'>
            <a>Users</a>
          </Link>{' '}
          |{' '}
          <Link href='/ideas'>
            <a>Ideas</a>
          </Link>{' '}
          |{' '}
          <Link href='/clientonly'>
            <a>Client Only</a>
          </Link>{' '}
          | <span>Welcome {data.currentUser.username}</span> <SignOut />
        </nav>
      )}

      <h3>{props.title}</h3>
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
