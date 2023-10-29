import styled from 'styled-components';

import Button from '@/components/COMMON/Button/Button';
import Left from '@/components/ICONS/Left/Left';
import Link from '@/components/COMMON/Link/Link';

const BackButton = () => (
  <Link href='/'>
    <Buttonn name='back'>
      <Leftt />
      Back
    </Buttonn>
  </Link>
);

export default BackButton;

const Buttonn = styled(Button)`
  padding-left: 0.5rem;
`;

const Leftt = styled(Left)`
  fill: ${props => props.theme.fill.primary};
  height: 0.8rem;
  margin-right: 0.5rem;
`;
