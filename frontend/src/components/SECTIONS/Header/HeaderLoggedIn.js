import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderLoggedIn = () => {
  const router = useRouter();

  const isActive = pathname => router.pathname === pathname;

  return (
    <>
      <li>
        <Link href='/account'>
          <a data-active={isActive('/account')}>Settings</a>
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
