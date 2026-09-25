import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;

  const primeiroLoginPendente =
    request.cookies.get('primeiroLoginPendente')?.value === 'true';

  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/cadastro-livro') ||
    request.nextUrl.pathname.startsWith('/alterar-senha') ||
    request.nextUrl.pathname.startsWith('/dados-adicionais');

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/', request.url);

    return NextResponse.redirect(loginUrl);
  }

  if (token && primeiroLoginPendente) {
    if (pathname !== '/alterar-senha') {
      return NextResponse.redirect(new URL('/alterar-senha', request.url));
    }
  }

  if (token && !primeiroLoginPendente && pathname === '/alterar-senha') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/cadastro-livro', '/alterar-senha', '/dados-adicionais'],
};
