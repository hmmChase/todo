import FullPage from './FullPage';

const story = { component: FullPage, title: 'LAYOUTS/FullPage' };

export const fullPage = () => (
  <FullPage description={'description'} title={'title'}>
    <div>children</div>
  </FullPage>
);

export default story;
