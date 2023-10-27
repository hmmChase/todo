import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) =>
  res.status(200).json({ name: 'ToDo' });

export default handler;
