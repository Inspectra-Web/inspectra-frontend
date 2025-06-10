import { apiClient, handleError, handleResponse } from "../helpers/apiHelpers";

export async function sendInquiryMessage(data) {
  try {
    const response = await apiClient.post(`/inquiry/send-inquiry`, data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function viewRealtorInquiries({
  sort = "",
  search = "",
  page = 1,
  limit = 10,
}) {
  try {
    const query = new URLSearchParams();

    if (search.trim() !== "") query.append("search", search);
    if (sort) query.append("sort", sort);
    query.append("page", page);
    query.append("limit", limit);

    const response = await apiClient.get(
      `/inquiry/realtor-inquiry-list?${query.toString()}&fields=_id,clientEmail,clientName,message,property,createdAt,urgencyLevel`
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function viewInquiries({
  sort = "",
  search = "",
  page = 1,
  limit = 10,
}) {
  try {
    const query = new URLSearchParams();

    if (search.trim() !== "") query.append("search", search);
    if (sort) query.append("sort", sort);
    query.append("page", page);
    query.append("limit", limit);

    const response = await apiClient.get(
      `/inquiry/inquiries?${query.toString()}&fields=_id,clientEmail,clientName,message,property,createdAt,urgencyLevel`
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
