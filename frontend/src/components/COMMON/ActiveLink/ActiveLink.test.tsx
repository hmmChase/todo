import { cleanup, render, screen } from '@/utils/test-utils';
import ActiveLink from './ActiveLink';

jest.mock('next/router', () => ({
  useRouter: () => ({ asPath: '/test', isReady: true })
}));

describe('ActiveLink', () => {
  afterEach(cleanup);

  it('passes active class when route matches', async () => {
    render(
      <ActiveLink activeClassName='active' className='class' href='/test'>
        test
      </ActiveLink>
    );

    expect(screen.getByText('test')).toHaveClass('class active');
  });
});

it('doesnt pass active class when route doesnt match', async () => {
  render(
    <ActiveLink activeClassName='active' className='class' href='/'>
      test
    </ActiveLink>
  );

  expect(screen.getByText('test')).toHaveClass('class');
  expect(screen.getByText('test')).not.toHaveClass('active');
});
