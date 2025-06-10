import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMessagesForChatRoom as getMessagesForChatRoomApi,
  markMessagesAsSeen as markMessagesAsSeenApi,
  sendNewMessage as sendNewMessageApi,
} from "../services/apiMessage";
import { toast } from "react-toastify";
import { errData } from "../helpers/apiHelpers";

export function useSendNewMessage() {
  const queryClient = useQueryClient();
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: sendNewMessageApi,
    onSuccess: (msg, variables) => {
      queryClient.invalidateQueries(["messages", variables.id]);
      toast.success(msg);
    },
    onError: errData,
  });

  return { sendMessage, isPending };
}

export function useGetMessagesForChatRoom(chatroomId) {
  const { isPending, data } = useQuery({
    queryKey: ["messages", chatroomId],
    queryFn: () => getMessagesForChatRoomApi(chatroomId),
    enabled: !!chatroomId,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });

  return { isPending, messages: data };
}

export function useMarkMessagesAsSeen() {
  const queryClient = useQueryClient();
  const { isPending, mutate: markAsSeen } = useMutation({
    mutationFn: markMessagesAsSeenApi,
    onSuccess: (msg, variables) => {
      queryClient.invalidateQueries(["messages", variables.id]);
      toast.success(msg);
    },
    onError: errData,
  });

  return { isPending, markAsSeen };
}
