import Link from 'next/link';

class Nav extends React.PureComponent {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="examples">
              <a>Examples</a>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
