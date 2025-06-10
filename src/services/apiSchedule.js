import { apiClient, handleError, handleResponse } from "../helpers/apiHelpers";

export async function sendInsectionSchedule(data) {
  try {
    const response = await apiClient.post(
      `/schedule/schedule-inspection`,
      data
    );

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function viewRealtorInspectionSchedules({
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
      `/schedule/realtor-schedule-list?${query.toString()}&fields=_id,clientEmail,clientName,message,property,createdAt,scheduleDate`
    );
    return handleResponse(response);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
}

export async function viewInspectionSchedules({
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
      `/schedule/inspections?${query.toString()}&fields=_id,clientEmail,clientName,message,property,createdAt,scheduleDate`
    );
    return handleResponse(response);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
}
