import PassResetError from './PassResetError';

const story = { component: PassResetError, title: 'USER/PassResetError' };

export const passResetError = () => (
  <PassResetError isTokenExpired={false} isTokenPresent={false} />
);

export default story;
