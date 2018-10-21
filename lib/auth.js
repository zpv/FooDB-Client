import { setCookie, getCookie, removeCookie } from "./session";

export const signUp = async (name, email, password, password_confirmation) => {
    const error = validateNewUser(name, email, password, password_confirmation);
    if (error) {
      return error;
    }
  
    const res = await createUser(name, email, password, password_confirmation);
  
    if (!res.data) {
      return res;
    }
  
    setCookie("success", `${name}, your account was created.`);
    redirect("/auth/login");
    return null;
};