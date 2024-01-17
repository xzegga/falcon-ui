import { RequestCookies } from "@edge-runtime/cookies";
import { CookieOptions, createServerClient } from "@supabase/ssr";

export const createClient = (cookies: RequestCookies) => {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookies.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              try {
                cookies.set({ name, value, ...options });
              } catch (error) {
                // The `set` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
              }
            },
            remove(name: string, options: CookieOptions) {
              try {
                cookies.set({ name, value: "", ...options });
              } catch (error) {
                // The `delete` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
              }
            },
          },
        }
      );
  }