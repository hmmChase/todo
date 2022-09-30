// https://nextjs.org/docs/advanced-features/middleware

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Setting cookies on the response
  const response = NextResponse.next();
  response.cookies.set('vercel', 'fast');
  response.cookies.set('vercel', 'fast', { path: '/test' });

  // Getting cookies from the request
  const cookie = request.cookies.get('vercel');
  // console.log(cookie); // => 'fast'

  const allCookies = request.cookies.entries();
  // console.log(allCookies); // => [{ key: 'vercel', value: 'fast' }]

  const { value, options } = response.cookies.getWithOptions('vercel');
  // console.log(value); // => 'fast'
  // console.log(options); // => { Path: '/test' }

  // Deleting cookies
  response.cookies.delete('vercel');
  response.cookies.clear();

  return response;
}
