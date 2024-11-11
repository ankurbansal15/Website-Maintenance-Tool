// env.d.ts
namespace NodeJS {
    interface ProcessEnv {
        RESEND_API_KEY:string,
        MY_EMAIL:string,
        FROM_EMAIL:string,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:string,
        CLERK_SECRET_KEY:string,
        PAGESPEED_API_KEY:string,
        MONGO_URI:string,
    }
  }
  