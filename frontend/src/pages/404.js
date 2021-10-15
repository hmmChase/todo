// https://github.com/vercel/next.js/blob/master/errors/custom-error-no-custom-404.md

import FullPage from '../components/LAYOUTS/FullPage';

const FourOFourPage = () => <p>Nothing to see here.</p>;

FourOFourPage.getLayout = page => (
  <FullPage title='404' description='404 page' hasBackButton>
    {page}
  </FullPage>
);

export default FourOFourPage;
