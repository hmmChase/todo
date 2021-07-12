const userClientCleaner = user => ({
  id: user.id,
  email: user.email,
  role: user.role
});

export default userClientCleaner;
