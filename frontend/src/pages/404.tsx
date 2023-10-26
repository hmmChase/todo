import type { NextPageWithLayout } from 'next';

import Full from '@/components/LAYOUTS/Full/Full';

// https://github.com/vercel/next.js/blob/master/errors/custom-error-no-custom-404.md

const FourOFourPage: NextPageWithLayout = () => <p>Not Found</p>;

FourOFourPage.getLayout = function getLayout(page) {
  return (
    <Full title='404' description='404 page' hasBackButton>
      {page}
    </Full>
  );
};

export default FourOFourPage;
