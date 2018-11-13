import { setCookie, getCookie, removeCookie } from "./session"
import { createUser } from "../services/userApi"
import { authenticate } from "../services/authApi"
import redirect from "./redirect"

export const signUp = async (name, email, password, phone) => {
    const res = await createUser(name, email, password, phone);
  
    if (!res.auth) {
      return res.error;
    }

    setCookie("jwt", res.token)
    redirect("/")
    return null
};

export const isAuthenticated = ctx => !!getJwt(ctx);

export const getJwt = ctx => {
  return getCookie("jwt", ctx.req);
};

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie("jwt");
    redirect("/", ctx);
  }
};

export const signIn = async (email, password) => {
  const res = await authenticate(email, password)

  if (!res.auth) {
    return "Invalid login."
  }
  
  setCookie("jwt", res.token)
  redirect("/")
  return null
}

export const redirectUnauthenticated = (ctx, path) => {
  if (!isAuthenticated(ctx)){
    redirect(path, ctx)
    return false
  }
  return true
}