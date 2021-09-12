import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderLoggedIn = props => {
  const router = useRouter();

  const isActive = pathname => router.pathname === pathname;

  return (
    <>
      <li>
        <Link href='/profile'>
          <a data-active={isActive('/profile')}>Profile</a>
        </Link>
      </li>

      <li>
        <Link href='/logout'>
          <a data-active={isActive('/logout')}>Log out</a>
        </Link>
      </li>

      <style jsx>{`
        a[data-active='true'] {
          color: red;
        }
      `}</style>
    </>
  );
};

export default HeaderLoggedIn;
