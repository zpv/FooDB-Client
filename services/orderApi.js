import { post, get } from "../lib/request"

export const getStatus = (order) => {
  if (order.delivered_datetime) {
      return "Delivered"
  } else if (order.received_datetime) {
      return "Driver is on the way to deliver your order"
  }else if (order.prepared_datetime) {
    return "Driver is on the way to the restaurant"
  }
   else {
      return "Restaurant is preparing your meal"
  }
}

export const updateOrder = async (order_id, status) => {
  console.log('test')
  try {
    const {data}  = await post(`/orders/${order_id}/status`, {
      status
    });
    return data;
  } catch (error) {
    return {auth: false, error: error.toString()}
  }
}

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