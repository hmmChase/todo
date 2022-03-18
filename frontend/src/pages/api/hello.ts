// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) =>
  res.status(200).json({ name: 'John Doe' });

export default handler;
