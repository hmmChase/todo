import { mockGQLErrors } from '@/mocks/mockGQLErrors';
import displayMsg from '@/constants/displayMsg';
import parseGQLErrors from '../parseGQLErrors';

describe('parseGQLErrors', () => {
  it('returns correct displayMsg corresponding to displayCode', () => {
    const errors = parseGQLErrors(mockGQLErrors);

    expect(errors).toBeInstanceOf(Array);
    expect(errors).toHaveLength(2);
    expect(errors).toEqual([displayMsg.error, displayMsg.user.null]);
  });
});
