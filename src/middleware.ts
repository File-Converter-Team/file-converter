import { auth } from "@/auth"

export default auth(async (req) => {
  if (!req.auth && req.url.includes('/profile')) {
    const url = new URL(`${process.env.NEXTAUTH_URL}/auth`);
    return Response.redirect(url);
  }
})
