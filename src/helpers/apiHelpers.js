import axios from "axios";
import { toast } from "react-toastify";

export const apiClient = axios.create({
  baseURL: `http://localhost:5000/api/v1`,
  // baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
});

export const handleResponse = (response) => {
  return (
    response.data.data?.user ||
    response.data.message ||
    response.data.data ||
    response.data.data?.profile ||
    response.data
  );
};

export const handleError = (error) => {
  throw error.response?.data?.message || "An error occured";
};

export const errData = (error) =>
  toast.error(error || "An error occured. Please try again!");
