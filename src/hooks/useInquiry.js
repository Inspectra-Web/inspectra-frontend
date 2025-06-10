import { useMutation, useQuery } from "@tanstack/react-query";
import {
  sendInquiryMessage as sendInquiryMessageApi,
  viewInquiries as viewInquiriesApi,
  viewRealtorInquiries as viewRealtorInquiriesApi,
} from "../services/apiInquiry";
import { toast } from "react-toastify";
import { errData } from "../helpers/apiHelpers";

export function useSendInquiryMessage() {
  const { mutate: sendInquiry, isPending: isSending } = useMutation({
    mutationFn: (data) => sendInquiryMessageApi(data),
    onSuccess: (msg) => toast.success(msg),
    onError: errData,
  });

  return { sendInquiry, isSending };
}

export function useViewRealtorInquiries({ sort, search, page, limit = 10 }) {
  const {
    isPending,
    isError,
    data: inquiries,
  } = useQuery({
    queryKey: ["inquiryKey", { sort, search, page, limit }],
    queryFn: () => viewRealtorInquiriesApi({ sort, search, page, limit }),
  });

  return {
    isPending,
    isError,
    inquiries: inquiries?.inquiries,
    totalCount: inquiries?.totalCount,
  };
}

export function useViewInquiries({ sort, search, page, limit = 10 }) {
  const {
    isPending,
    isError,
    data: inquiries,
  } = useQuery({
    queryKey: ["inquiryKey", { sort, search, page, limit }],
    queryFn: () => viewInquiriesApi({ sort, search, page, limit }),
  });

  return {
    isPending,
    isError,
    inquiries: inquiries?.inquiries,
    totalCount: inquiries?.totalCount,
  };
}
