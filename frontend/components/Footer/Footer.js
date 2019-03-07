import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
`;

class Footer extends React.PureComponent {
  render() {
    return (
      <StyledFooter>
        <p>Footer</p>
      </StyledFooter>
    );
  }
}

export default Footer;
