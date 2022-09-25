import Full from './Full';

const story = { component: Full, title: 'LAYOUTS/Full' };

export const full = () => (
  <Full description={'description'} title={'title'}>
    <div>children</div>
  </Full>
);

export default story;
