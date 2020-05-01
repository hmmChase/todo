export const devConLog = (messageArr) => {
  if (process.env.NODE_ENV === 'development')
    console.log(...messageArr, new Date().getMilliseconds());
};

export const devConWarn = (messageArr) => {
  if (process.env.NODE_ENV === 'development')
    console.warn(...messageArr, new Date().getMilliseconds());
};

export const devConErr = (messageArr) => {
  if (process.env.NODE_ENV === 'development')
    console.error(...messageArr, new Date().getMilliseconds());
};
