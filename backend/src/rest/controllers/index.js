export const index = (req, res, next) =>
  res.status(200).json({ route: 'index' });
