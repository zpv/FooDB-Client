import { post } from "../lib/request";

export const authenticateUser = async (email, password) => {
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

export const authenticateDriver = async (email, password) => {
  try {
    const {data} = await post("/drivers/login", {
        email,
        password
    });
    return data;
    } catch (error) {
      return {auth: false, error: error}
    }
};
