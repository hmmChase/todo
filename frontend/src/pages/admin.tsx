// import { GetServerSideProps, NextPageWithLayout } from 'next';
import { NextPageWithLayout } from 'next';

import Admin from '@/components/SECTIONS/ADMIN/Admin';
import App from '@/components/LAYOUTS/App/App';
// import verifyUser from '@/utils/verifyUser';

const AdminPage: NextPageWithLayout = () => <Admin />;

AdminPage.getLayout = function getLayout(page) {
  return (
    <App
      title='Admin'
      description='Admin page'
      hasHeader
      hasBackButton
      hasFooter
    >
      {page}
    </App>
  );
};

// export const getServerSideProps: GetServerSideProps = async ctx => {
//   const { req, res } = ctx;

//   const userPayload = verifyUser(req.headers.cookie);

//   if (!userPayload) {
//     res.writeHead(302, { Location: '/' });

//     res.end();
//   }

//   return { props: {} };
// };

export default AdminPage;
