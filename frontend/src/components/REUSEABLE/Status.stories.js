import Status from './Status';

export default { component: Status, title: 'REUSEABLE/Status' };

export const info = () => <Status status='info'>info</Status>;

export const loading = () => <Status status='loading' />;

export const error = () => (
  <Status status='error' error={{ message: 'error: mock error' }} />
);

export const success = () => <Status status='success'>success</Status>;
