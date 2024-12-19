import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";


// API for registering a new user
export const registerUser = async (reqBody) => {
  return await commonApi('POST', `${serverUrl}/users`, reqBody);
};

// API for logging in a user
export const loginUser = async (reqBody) => {
  return await commonApi('POST', `${serverUrl}/login`, reqBody); // Adjust endpoint if needed
};

// API for fetching all users
export const getUsers = async () => {
  return await commonApi('GET', `${serverUrl}/users`);
};


// API to add health data
export const addHealthData = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/data`, reqBody);
};

//Api to get data from added details
export const getData = async () => {
  return await commonApi("GET", `${serverUrl}/data`);
};

// API for deleting data
export const deleteData = async (id) => {
  return await commonApi('DELETE', `${serverUrl}/data/${id}`);
};

//update a specific  item by id

export const  updateData = async(id, data)=>{
  return await commonApi('PUT',`${serverUrl}/data/${id}`,data)
}

//to get userdata
export const getUserData = async (id) => {
  return await commonApi('GET', `${serverUrl}/users/${id}`);
};

export const getDataByIdAPI = async (id) => {
  return await commonApi("GET",`${serverUrl}/data/${id}`, "");
  };

