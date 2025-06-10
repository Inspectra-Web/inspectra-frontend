import { apiClient, handleError, handleResponse } from "../helpers/apiHelpers";

export async function getPlans() {
  try {
    const response = await apiClient.get("/plan");
    console.log(response);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
