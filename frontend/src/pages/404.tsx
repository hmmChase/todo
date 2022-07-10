// https://github.com/vercel/next.js/blob/master/errors/custom-error-no-custom-404.md

import { NextPageWithLayout } from 'next';

import FullPage from '@/components/LAYOUTS/FullPage';

const FourOFourPage: NextPageWithLayout = () => <p>Nothing to see here.</p>;

FourOFourPage.getLayout = function getLayout(page) {
  return (
    <FullPage title='404' description='404 page' hasBackButton>
      {page}
    </FullPage>
  );
};

export default FourOFourPage;
