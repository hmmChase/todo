// https://github.com/vercel/next.js/blob/master/errors/custom-error-no-custom-404.md

import { NextPage } from 'next';

import FullPage from '../components/LAYOUTS/FullPage';

const FourOFourPage: NextPage = () => <p>Nothing to see here.</p>;

FourOFourPage.getLayout = page => (
  <FullPage title='404' description='404 page' hasBackButton>
    {page}
  </FullPage>
);

export default FourOFourPage;
