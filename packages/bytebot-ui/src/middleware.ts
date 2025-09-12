import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/proxy/websockify(.*)",
  ],
});

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and the VNC WS proxy path
    "/((?!_next|api/proxy/websockify|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
