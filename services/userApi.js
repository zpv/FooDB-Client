import { post, get, deleteCall } from "../lib/request"

export const createUser = async (
  name,
  email,
  password,
  phone,
  address,
  userType
) => {
  try {
    const {data}  = await post("/users/register", {
        name,
        email,
        password,
        phone,
        address
    });
    return data;
  } catch (error) {
    if (error.response.status == 409)
        return {auth: false, error: "User with the same email already exists."}
    return {auth: false, error: error.toString()}
  }
};

export const editUser = async (
  name,
  email,
  password,
  phone,
  address,
  jwt
) => {
  console.log("afwea")
  try {
    const { data } = await post("/users/edit", {
      name,
      email,
      password,
      phone,
      address
    }, jwt)
    return data;
  } catch (error) {
    return {auth: false, error: error.toString()}
  }
}
export const editDriver = async (
  name,
  email,
  password,
  phone,
  address,
  jwt
) => {
  console.log("afwea")
  try {
    const { data } = await post("/drivers/edit", {
      name,
      email,
      password,
      phone,
      address
    }, jwt)
    return data;
  } catch (error) {
    return {auth: false, error: error.toString()}
  }
}

export const createDriver = async (
  name,
  email,
  password,
  phone,
  address
) => {
  try {
    const {data}  = await post("/drivers/register", {
        name,
        email,
        password,
        phone,
        address
    });
    return data;
  } catch (error) {
    if (error.response.status == 409)
        return {auth: false, error: "Driver with the same email already exists."}
    return {auth: false, error: error.toString()}
  }
};

export const deleteUser = async (
  email
) => {
  try {
    const {data} = await post("/users/delete", {
      email
    });
    return data;
  } catch (error) {
    if (error.response.status == 401)
        return {auth: false, error: "User with the same email does not exist."}
    return {auth: false, error: error.toString()}
  }
}

export const deleteDriver = async (
  email,
  password 
) => {
  try {
    const {data} = await post("/drivers/delete", {
      email,
      password
    });
    return data;
  } catch (error) {
    if (error.response.status == 401)
        return {auth: false, error: "User with the same email does not exist."}
    return {auth: false, error: error.toString()}
  }
}