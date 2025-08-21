import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  sendInsectionSchedule as sendInspectionScheduleApi,
  updateInspectionScheduleStatus as updateInspectionScheduleStatusApi,
  viewClientInspectionSchedules as viewClientInspectionSchedulesApi,
  viewInspectionScheduleDetails as viewInspectionScheduleDetailsApi,
  viewInspectionSchedules as viewInspectionSchedulesApi,
  viewRealtorInspectionSchedules as viewRealtorInspectionSchedulesApi,
} from "../services/apiSchedule";
import { toast } from "react-toastify";
import { errData } from "../helpers/apiHelpers";

export function useSendInspectionSchedule() {
  const { mutate: sendSchedule, isPending: isSending } = useMutation({
    mutationFn: (data) => sendInspectionScheduleApi(data),
    onSuccess: (res) => {
      toast.success(res?.message);

      if (res?.paymentLink) {
        window.location.href = res.paymentLink;
      }
    },
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
    queryKey: ["scheduleRealtorKey", { sort, search, page, limit }],
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

export function useViewClientInspectionSchedules({
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
    queryKey: ["scheduleClientKey", { sort, search, page, limit }],
    queryFn: () =>
      viewClientInspectionSchedulesApi({ sort, search, page, limit }),
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

export function useViewInspectionScheduleDetails(id) {
  const { isPending, data, isError } = useQuery({
    queryKey: ["one-schedule", id],
    queryFn: () => viewInspectionScheduleDetailsApi(id),
    enabled: !!id,
  });

  return { isPending, isError, schedule: data?.schedule };
}

export function useUpdateInspectionScheduleStatus() {
  const queryClient = useQueryClient();
  const {
    mutate: updateStatus,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: ({ id, status }) =>
      updateInspectionScheduleStatusApi(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["one-schedule", variables.id]);
      queryClient.invalidateQueries(["schedule-status"]);
      toast.success(data);
    },
    onError: errData,
  });

  return { updateStatus, isPending, isError, isSuccess };
}
