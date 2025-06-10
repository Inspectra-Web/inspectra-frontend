import { apiClient, handleError, handleResponse } from "../helpers/apiHelpers";

export async function allRealtors({
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
      `/users/realtors?${query.toString()}&fields=_id,firstname,middlename,telephone,experience,verified,specialization,gender,avatar,deactivated`
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
