import { useMutation, useQuery } from "@tanstack/react-query";
import {
  sendInsectionSchedule as sendInspectionScheduleApi,
  viewInspectionSchedules as viewInspectionSchedulesApi,
  viewRealtorInspectionSchedules as viewRealtorInspectionSchedulesApi,
} from "../services/apiSchedule";
import { toast } from "react-toastify";
import { errData } from "../helpers/apiHelpers";

export function useSendInspectionSchedule() {
  const { mutate: sendSchedule, isPending: isSending } = useMutation({
    mutationFn: (data) => sendInspectionScheduleApi(data),
    onSuccess: (msg) => toast.success(msg),
    onError: errData,
  });

  return { sendSchedule, isSending };
}

export function useViewRealtorInspectionSchedules({
  sort,
  search,
  page,
  limit = 10,
}) {
  const {
    isPending,
    isError,
    data: schedules,
  } = useQuery({
    queryKey: ["scheduleKey", { sort, search, page, limit }],
    queryFn: () =>
      viewRealtorInspectionSchedulesApi({ sort, search, page, limit }),
  });
  return {
    isPending,
    isError,
    schedules: schedules?.schedules,
    totalCount: schedules?.totalCount,
  };
}

export function useViewInspectionSchedules({ sort, search, page, limit = 10 }) {
  const {
    isPending,
    isError,
    data: schedules,
  } = useQuery({
    queryKey: ["scheduleKey", { sort, search, page, limit }],
    queryFn: () => viewInspectionSchedulesApi({ sort, search, page, limit }),
  });
  return {
    isPending,
    isError,
    schedules: schedules?.schedules,
    totalCount: schedules?.totalCount,
  };
}
