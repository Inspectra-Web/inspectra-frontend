import { apiClient, handleError, handleResponse } from "../helpers/apiHelpers";

export async function sendNewMessage(data) {
  try {
    const response = await apiClient.post("/message", data);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getMessagesForChatRoom(chatroomId) {
  try {
    const response = await apiClient.get(
      `/message/chat-room-messages/${chatroomId}`
    );

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function markMessagesAsSeen(data) {
  try {
    const response = await apiClient.patch(`/message/mark-as-seen`, data);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
