import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createChatRoom as createChatRoomApi,
  getGuestChatRoom as getGuestChatRoomApi,
  getRealtorChatRoom as getRealtorChatRoomApi,
} from "../services/apiChat";
import { errData } from "../helpers/apiHelpers";
import { toast } from "react-toastify";

export function useGetGuestChatRoom(token) {
  const { isPending, isError, data } = useQuery({
    queryKey: ["guest-chat"],
    queryFn: () => getGuestChatRoomApi(token),
  });

  return { isPending, isError, guestChatRoom: data };
}

export function useGetRealtorChatRoom() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["realtor-chat"],
    queryFn: getRealtorChatRoomApi,
  });

  return { isPending, isError, realtorChatRoom: data };
}

export function useCreateChatRoom() {
  const { mutate: createChat, isPending } = useMutation({
    mutationFn: createChatRoomApi,
    onSuccess: (msg) => toast.success(msg),
    onError: errData,
  });

  return { createChat, isPending };
}
