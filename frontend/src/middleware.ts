// https://nextjs.org/docs/advanced-features/middleware

import type { NextRequest } from 'next/server';

const middleware = (request: NextRequest) => {
  const accessCookie = request.cookies.get('access')?.value;
};

export default middleware;
