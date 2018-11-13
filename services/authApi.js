import { post } from "../lib/request";

export const authenticate = async (email, password) => {
  try {
    const {data} = await post("/users/login", {
        email,
        password
    });
    return data;
    } catch (error) {
      return {auth: false, error: error}
    }
};