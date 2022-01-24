import DisplayStatus from './DisplayStatus';

export default { component: DisplayStatus, title: 'REUSEABLE/DisplayStatus' };

export const info = () => <DisplayStatus status='info'>info</DisplayStatus>;

export const loading = () => <DisplayStatus status='loading' />;

export const error = () => (
  <DisplayStatus status='error' error={{ message: 'error: mock error' }} />
);

export const success = () => (
  <DisplayStatus status='success'>success</DisplayStatus>
);
