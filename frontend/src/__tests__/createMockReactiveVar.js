// This is how to create a mock reactive variable.
// It's a good idea to do this because then we can test our
// interaction logic.

export const createMockReactiveVar = defaultValue => {
  let currentValue = defaultValue;

  const mockReactiveVar = newValue => {
    if (newValue) currentValue = newValue;

    return currentValue;
  };

  return mockReactiveVar;
};
