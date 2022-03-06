import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Button from '../REUSEABLE/Button';
import Left from '../DESIGN/icons/Left';

interface Props {
  className?: string;
}

const BackButton: FC<Props> = props => {
  const { className } = props;

  return (
    <Link href='/'>
      <div className={className}>
        <Buttonn aria-label='back' type='text'>
          <Leftt />
          Back
        </Buttonn>
      </div>
    </Link>
  );
};

export default BackButton;

const Buttonn = styled(Button)`
  align-items: center;
  display: flex;
  gap: 0.25rem;
  padding-left: 0.5rem;
`;

const Leftt = styled(Left)`
  fill: ${props => props.theme.fill.primary};
  height: 0.8rem;
`;
