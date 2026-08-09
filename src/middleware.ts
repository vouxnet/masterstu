import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  // Check demo session cookie fallback
  const authCookie = request.cookies.get("kpss_session");
  const isDemoAuthenticated = Boolean(authCookie?.value);
  const isAuthenticated = !!user || isDemoAuthenticated;

  // If user is trying to access protected route without being authenticated
  if (isProtectedRoute && !isAuthenticated) {
    if (process.env.NODE_ENV === "development") {
      // In local development / preview mode, if cookie is not set yet, we allow demo access with session set
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

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icon-.*\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
