import { setCookie, getCookie, removeCookie } from "./session"
import { createUser } from "../services/userApi"
import { authenticateUser, authenticateDriver } from "../services/authApi"
import redirect from "./redirect"

export const signUpUser = async (name, email, password, phone, address) => {
    const res = await createUser(name, email, password, phone, address);
  
    if (!res.auth) {
      return res.error;
    }

    setCookie("jwt", res.token)
    redirect("/")
    return null
};
export const signUpDriver = async (name, email, password, phone, address) => {
  const res = await createUser(name, email, password, phone, address);

  if (!res.auth) {
    return res.error;
  }

  setCookie("jwt", res.token)
  redirect("/driver/")
  return null
};
export const isAuthenticated = (ctx = {}) => !!getJwt(ctx);

export const getJwt = (ctx = {}) => {
  return getCookie("jwt", ctx.req);
};

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie("jwt");
    redirect("/", ctx);
  }
};

export const signInUser = async (email, password) => {
  const res = await authenticateUser(email, password)

  if (!res.auth) {
    return "Invalid login."
  }
  
  setCookie("jwt", res.token)
  redirect("/")
  return null
}
export const signInDriver = async (email, password) => {
  const res = await authenticateDriver(email, password)

  if (!res.auth) {
    return "Invalid login."
  }
  
  setCookie("jwt", res.token)
  redirect("/")
  return null
}
export const redirectUnauthenticated = (path, ctx = {}) => {
  if (!isAuthenticated(ctx)){
    redirect(path, ctx)
    return true
  }
  return false
}