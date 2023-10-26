import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

type Data = {
  name: string;
};

const handler: NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => res.status(200).json({ name: 'ToDo' });

export default handler;
