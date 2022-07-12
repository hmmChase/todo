import Status from './Status';

const story = { component: Status, title: 'REUSEABLE/Status' };

export const error = () => <Status status='error'>error</Status>;

export const info = () => <Status status='info'>info</Status>;

export const success = () => <Status status='success'>success</Status>;

export default story;
