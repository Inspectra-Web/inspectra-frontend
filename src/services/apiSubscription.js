import { apiClient, handleError, handleResponse } from "../helpers/apiHelpers";

export async function initiateSubscription({ planId, email, fullname }) {
  try {
    const response = await apiClient.post("/subscription/initiate", {
      planId,
      email,
      fullname,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getUserSubscriptionHistory({
  sort = "",
  search = "",
  page = 1,
  limit = 10,
}) {
  try {
    const query = new URLSearchParams();

    if (search) query.append("search", search);
    if (sort) query.append("sort", sort);
    query.append("page", page);
    query.append("limit", limit);

    const response = await apiClient.get(
      `/subscription/history?${query.toString()}`
    );

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getAllSubscriptions({
  sort = "",
  search = "",
  page = 1,
  limit = 10,
}) {
  try {
    const query = new URLSearchParams();

    if (search) query.append("search", search);
    if (sort) query.append("sort", sort);
    query.append("page", page);
    query.append("limit", limit);

    const response = await apiClient.get(
      `/subscription/admin/all?${query.toString()}`
    );

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
