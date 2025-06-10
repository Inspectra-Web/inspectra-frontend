import { apiClient, handleError, handleResponse } from "../helpers/apiHelpers";

export async function getGuestChatRoom(token) {
  try {
    const response = await apiClient.get(`/chat/guest/${token}`);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getRealtorChatRoom() {
  try {
    const response = await apiClient.get(`/chat/realtor-chat`);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function createChatRoom(data) {
  try {
    const response = await apiClient.post(`/chat/create-chat`, data);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getGuestUser(guestId) {
  try {
    const response = await apiClient.get(`/chat/guest/${guestId}`);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
