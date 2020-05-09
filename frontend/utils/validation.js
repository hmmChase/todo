import isEmail from 'isemail';
import Filter from 'bad-words';
import {
  usernameMinLength,
  usernameMaxLength,
  passwordMinLength,
  passwordMaxLength,
} from '../config';

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

  // https://github.com/web-mech/badwords/issues/60
  const filter = new Filter();
  const isProfane = filter.isProfane(username);
  if (isProfane) return 'Username contains restricted words';
};

/* Email */

export const validateEmail = (email) => {
  const notString = typeof email !== 'string';

  if (notString) return 'Invalid email address';

  const isvalid = isEmail.validate(email);

  if (!isvalid) return 'Please provide a valid email address';
};

/* Password */

export const validatePassword = (password) => {
  /*
  https://regexr.com/3bfsi
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  - At least 8 characters
  - Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
  - Can contain special characters
  */

  const notString = typeof password !== 'string';
  if (notString) return 'Invalid password';

  const tooShort = password.length < passwordMinLength;
  if (tooShort)
    return `Password must have at least ${passwordMinLength} characters`;

  const tooLong = password.length > passwordMaxLength;
  if (tooLong)
    return `Password must have no more than ${passwordMaxLength} characters`;

  const hasUpperCase = password.match(/[A-Z]/g);
  if (!hasUpperCase) return 'Password must contain an uppercase letter';

  const hasLowerCase = password.match(/[a-z]/g);
  if (!hasLowerCase) return 'Password must contain a lowercase letter';

  const hasNumber = password.match(/[0-9]/g);
  if (!hasNumber) return 'Password must contain a number';
};
