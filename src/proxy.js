import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from './lib/auth';

// Default Export (সবচেয়ে সহজ ও পরিষ্কার)
export  async function proxy(request) {
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(session?.user?.role == 'trainer' && session?.user?.plan =="free") {
    return NextResponse.redirect(new URL('/priceing', request.url))
  }

  if (!session) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/trainer'],
}