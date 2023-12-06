import Link from 'next/link';

import { ExpandIconBtn } from '@/components/COMMON/IconBtn/IconBtn';

interface Props {
  className?: string;
  taskId: string;
}

const DetailIcon = ({ className, taskId }: Props) => (
  <Link href={`/task/${taskId}`} passHref>
    <div className={className}>
      <ExpandIconBtn name='taskDetail' />
    </div>
  </Link>
);

export default DetailIcon;
