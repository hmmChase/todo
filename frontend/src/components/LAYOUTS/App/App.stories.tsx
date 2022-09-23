import App from './App';

const story = { component: App, title: 'LAYOUT/Layout' };

export const layout = () => (
  <App description={'description'} title={'title'}>
    <div>children</div>
  </App>
);

export default story;
