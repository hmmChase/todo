import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Button from '@/components/COMMON/Button/Button';
import Left from '@/components/DESIGN/ICONS/Left/Left';

interface Props {
  className?: string;
}

const BackButton: FC<Props> = ({ className }) => (
  <span>
    <Link href='/' passHref>
      <span>
        <Buttonn className={className} name='back'>
          <Leftt />
          Back
        </Buttonn>
      </span>
    </Link>
  </span>
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
