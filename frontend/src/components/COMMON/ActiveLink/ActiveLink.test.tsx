import { cleanup, render, screen } from '@/utils/test-utils';
import ActiveLink from './ActiveLink';

jest.mock('next/router', () => ({
  useRouter: () => ({ asPath: '/route', isReady: true })
}));

describe('ActiveLink', () => {
  afterEach(cleanup);

  it('passes active class when route matches', async () => {
    render(
      <ActiveLink activeClassName='active' className='class' href='/route'>
        link
      </ActiveLink>
    );

    expect(screen.getByText('link')).toHaveClass('class active');
  });
});

it('doesnt pass active class when route doesnt match', async () => {
  render(
    <ActiveLink activeClassName='active' className='class' href='/'>
      link
    </ActiveLink>
  );

  expect(screen.getByText('link')).toHaveClass('class');

  expect(screen.getByText('link')).not.toHaveClass('active');
});
