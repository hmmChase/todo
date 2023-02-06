import type { NextRequest } from 'next/server';

// https://nextjs.org/docs/advanced-features/middleware

const middleware = (request: NextRequest) => {
  const accessCookie = request.cookies.get('access')?.value;
};

export default middleware;
