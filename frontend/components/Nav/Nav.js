import Link from 'next/link';

class Nav extends React.PureComponent {
  render() {
    return (
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="examples">
          <a>Examples</a>
        </Link>
      </nav>
    );
  }
}

export default Nav;
