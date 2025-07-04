import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createChatRoom as createChatRoomApi,
  getClientChatRoom as getClientChatRoomApi,
  getRealtorChatRoom as getRealtorChatRoomApi,
} from "../services/apiChat";
import { errData } from "../helpers/apiHelpers";
import { toast } from "react-toastify";

export function useGetClientChatRoom() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["client-chat"],
    queryFn: getClientChatRoomApi,
  });

  return { isPending, isError, clientChatRoom: data };
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
