import { apiClient, handleResponse, handleError } from "../helpers/apiHelpers";

export async function getStatistics() {
  try {
    const response = await apiClient.get("/admin/stats");

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
