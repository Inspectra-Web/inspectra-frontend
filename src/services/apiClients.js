import { apiClient, handleError, handleResponse } from "../helpers/apiHelpers";

export async function allClients({
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
      `/users/clients?${query.toString()}&fields=_id,fullname,email,emailVerified,profile,referralCode,createdAt`
    );

    console.log(response);
    return handleResponse(response);
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}
