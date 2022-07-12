import Layout from './Layout';

const story = { component: Layout, title: 'LAYOUT/Layout' };

export const layout = () => (
  <Layout description={'description'} title={'title'}>
    <div>children</div>
  </Layout>
);

export default story;
