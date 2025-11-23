export { auth as middleware } from "@/lib/auth"

export const config = {
  matcher: ["/dashboard/:path*", "/letters/:path*", "/api/letters/:path*"],
}
