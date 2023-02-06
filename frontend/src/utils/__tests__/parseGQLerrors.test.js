import { mockGQLerrors } from '@/mocks/mockGQLerrors';
import displayMessages from '@/constants/displayMessages';
import parseGQLerrors from '../parseGQLerrors';

describe('parseGQLerrors', () => {
  it('returns correct messages corresponding to displayCode', () => {
    const errors = parseGQLerrors(mockGQLerrors);

    expect(errors).toBeInstanceOf(Array);
    expect(errors).toHaveLength(2);
    expect(errors).toEqual([displayMessages.error, displayMessages.user.null]);
  });
});
