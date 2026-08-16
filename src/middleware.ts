import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qbvhlnhvkzblnvukphxh.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidmhsbmh2a3pibG52dWtwaHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNjE3NzYsImV4cCI6MjEwMTgzNzc3Nn0.P2wCBAWatsvY9yLem91ylQ_TM-Jg49gaEg8t8vvXfoA";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
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

  // Allow auth callbacks, api routes, and public assets
  if (pathname.startsWith("/auth/callback") || pathname.startsWith("/api")) {
    return supabaseResponse;
  }

  // Protected routes list
  const protectedRoutes = [
    "/curriculum",
    "/flashcards",
    "/mistakes",
    "/exams",
    "/shared-qa",
    "/ai-hub",
    "/ai-schedule",
    "/placement",
    "/skill-tree",
    "/friends",
    "/league",
    "/settings",
  ];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route)) || pathname === "/";
  const isAuthenticated = !!user;

  // If user is trying to access protected route without being authenticated
  if (isProtectedRoute && !isAuthenticated) {
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
