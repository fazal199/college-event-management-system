import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL; // Replace with your API base URL
console.log(API_BASE_URL);

// GET request
export const getData = async ({ endpoint }: any) => {
  
  const { data } = await axios.get(API_BASE_URL + endpoint, {
      withCredentials: true,
  });
  console.log(data);

  return data;
};

// POST request
export const postData = async ({ endpoint, payload }: any) => {
  const { data } = await axios.post(API_BASE_URL + endpoint, payload, {
      withCredentials: true,

  });
  return data;
};

// PUT request
export const putData = async ({ endpoint, payload }: any) => {
  const { data } = await axios.put(`${API_BASE_URL}${endpoint}`, payload, {
      withCredentials: true,
  });
  return data;
};

// DELETE request
export const deleteData = async ({ endpoint }: any) => {
  const { data } = await axios.delete(`${API_BASE_URL}${endpoint}`, {
      withCredentials: true,
  });
  return data;
};
