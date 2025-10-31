import { NextRequest } from "next/server";
import { nextBasicAuthMiddleware } from "nextjs-basic-auth-middleware";

import { ADMIN_PASS, GUEST_PASS } from "@/constants/config";

export function middleware(request: NextRequest) {
  return nextBasicAuthMiddleware(
    {
      users: [
        {
          name: "guest",
          password: GUEST_PASS,
        },
        {
          name: "admin",
          password: ADMIN_PASS,
        },
      ],
    },
    request
  );
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
