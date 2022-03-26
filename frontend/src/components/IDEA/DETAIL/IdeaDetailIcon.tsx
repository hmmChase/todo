import { FC } from 'react';
import Link from 'next/link';

import { ExpandIconBtn } from '../../REUSEABLE/IconBtn';

interface Props {
  className?: string;
  ideaId: string;
}

const DetailIcon: FC<Props> = ({ className, ideaId }) => (
  <Link href={`/idea/${ideaId}`} passHref>
    <div className={className}>
      <ExpandIconBtn name='ideaDetail' />
    </div>
  </Link>
);

export default DetailIcon;
