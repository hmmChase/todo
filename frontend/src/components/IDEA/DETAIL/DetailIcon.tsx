import { FC } from 'react';
import Link from 'next/link';

import { ExpandIconBtn } from '../../REUSEABLE/IconBtn';

interface Props {
  className?: string;
  ideaId: string;
}

const DetailIcon: FC<Props> = props => {
  const { className, ideaId } = props;

  return (
    <Link href={`/idea/${ideaId}`}>
      <div className={className}>
        <ExpandIconBtn aria-label='idea detail' />
      </div>
    </Link>
  );
};

export default DetailIcon;
