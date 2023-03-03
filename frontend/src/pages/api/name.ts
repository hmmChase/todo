import type { NextApiHandler } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler: NextApiHandler = (req, res) =>
  res.status(200).json({ name: 'hmmStart' });

export default handler;
