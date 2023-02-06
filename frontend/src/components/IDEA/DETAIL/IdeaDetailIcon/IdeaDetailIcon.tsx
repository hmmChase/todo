import { ExpandIconBtn } from '@/components/COMMON/IconBtn/IconBtn';
import Link from 'next/link';
import type { FC } from 'react';

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
