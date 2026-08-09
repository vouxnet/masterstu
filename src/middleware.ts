import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes list
  const protectedRoutes = [
    "/",
    "/curriculum",
    "/flashcards",
    "/mistakes",
    "/exams",
    "/shared-qa",
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || (route !== "/" && pathname.startsWith(route))
  );

  // Check auth cookie / demo session cookie
  const authCookie = request.cookies.get("kpss_session");
  const isAuthenticated = Boolean(authCookie?.value);

  // If user is trying to access protected route without being authenticated
  if (isProtectedRoute && !isAuthenticated) {
    // In local development / preview mode, if cookie is not set yet, we allow demo access with session set
    if (process.env.NODE_ENV === "development") {
      const response = NextResponse.next();
      response.cookies.set("kpss_session", "demo-active-session", { path: "/" });
      return response;
    }

    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard if logged in user visits /login
  if (pathname === "/login" && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icon-.*\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
