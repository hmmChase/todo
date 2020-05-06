import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import SignOut from './SignOut';

const Header = () => {
  const { data } = useQuery(CURRENT_USER, { onError(_error) {} });

  return (
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
      |{' '}
      <span>
        Welcome {data && data.currentUser && data.currentUser.username}
      </span>{' '}
      <SignOut />
    </nav>
  );
};

export default Header;
