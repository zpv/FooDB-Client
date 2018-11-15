import { post, get } from "../lib/request"

export const createOrder = async (
  restaurant_id,
  food_items,
  jwt
) => {
  try {
    const {data}  = await post("/orders", {
      restaurant_id,
      food_items
    }, jwt);
    return data;
  } catch (error) {
    if (error.response.status == 409)
        return {auth: false, error: "User with the same email already exists."}
    return {auth: false, error: error.toString()}
  }
};