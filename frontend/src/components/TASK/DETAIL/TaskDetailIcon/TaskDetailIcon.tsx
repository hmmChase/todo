import { ExpandIconBtn } from '@/components/COMMON/IconBtn/IconBtn';
import Link from 'next/link';
import type { FC } from 'react';

interface Props {
  className?: string;
  taskId: string;
}

const DetailIcon: FC<Props> = ({ className, taskId }) => (
  <Link href={`/task/${taskId}`} passHref>
    <div className={className}>
      <ExpandIconBtn name='taskDetail' />
    </div>
  </Link>
);

export default DetailIcon;
