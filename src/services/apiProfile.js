import { apiClient, handleError, handleResponse } from "../helpers/apiHelpers";

export async function readProfile({ id }) {
  try {
    const response = await apiClient.get(`/profile/${id}`);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function updateProfile(id, data) {
  try {
    const response = await apiClient.patch(`/profile/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function uploadVerificationDoc(id, data) {
  try {
    const response = await apiClient.patch(`/profile/upload/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function manageVerificationDoc(docId, data) {
  try {
    const response = await apiClient.patch(
      `/profile/manage-doc/${docId}`,
      data
    );

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
