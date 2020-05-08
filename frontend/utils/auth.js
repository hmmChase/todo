import { usernameMinLength, usernameMaxLength } from '../config';

/* Username */

export const validateUsername = (username) => {
  /*
  https://regexr.com/3cg7r
  /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm
  - Can contain characters a-z, 0-9, underscores and periods
  - Cannot start with a period nor end with a period
  - Must not have more than one period sequentially
  - Max length is 30 chars
  */

  const notString = typeof username !== 'string';
  if (notString) return 'Invalid username';

  const hasSpaces = username.match(/[\s]/g);
  if (hasSpaces) return 'Username must not contain spaces';

  const tooShort = username.length < usernameMinLength;
  if (tooShort)
    return `Username must have at least ${usernameMinLength} characters`;

  const tooLong = username.length > usernameMaxLength;
  if (tooLong)
    return `Username must have no more than ${usernameMaxLength} characters`;

  const firstCharBad = username.match(/^[\.\_]/g);
  if (firstCharBad) return 'Username must start with an alphanumeric';

  const lastCharBad = username.match(/[\.\_]$/g);
  if (lastCharBad) return 'Username must end with an alphanumeric';

  const consecutiveUnderscores = username.match(/(?=.\_)[\_]/g);
  if (consecutiveUnderscores)
    return 'Username must not contain consecutive underscores';

  const consecutivePeriods = username.match(/(?=.\.)[\.]/g);
  if (consecutivePeriods)
    return 'Username must not contain consecutive periods';

  const notAlphanumeric = username.match(/[^\w\.]/g);
  if (notAlphanumeric)
    return 'Username must contain only letters, numbers, and nonconsecutive underscores and/or periods (excluded to start or end with)';

  // let filter = new Filter();
  // const isProfane = filter.isProfane(username);
  // if (isProfane)
  // setUsernameError('Username contains restricted words');
};
