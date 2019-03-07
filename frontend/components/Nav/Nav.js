import Link from 'next/link';
import styled from 'styled-components';

const StyledNav = styled.nav`
  a {
    color: white;
    letter-spacing: 1px;
    text-decoration: none;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
  }

  a:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    height: 100%;
    flex-wrap: wrap;
  }

  li {
    flex: 3;
    flex: 1 1 50%;
  }

  @media all and (max-width: 500px) {
    li {
      flex-basis: 100%;
    }
  }
`;

class Nav extends React.PureComponent {
  render() {
    return (
      <StyledNav>
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
      </StyledNav>
    );
  }
}

export default Nav;
