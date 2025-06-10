import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllSubscriptions as getAllSubscriptionsApi,
  getUserSubscriptionHistory as getUserSubscriptionHistoryApi,
  initiateSubscription,
} from "../services/apiSubscription";

export function useInitiateSubscription() {
  return useMutation({ mutationFn: initiateSubscription });
}

export function useGetUserSubscriptionHistory({
  sort,
  search,
  page,
  limit = 10,
}) {
  const {
    isError,
    isPending,
    data: subscriptions,
  } = useQuery({
    queryKey: ["subHistory", { sort, search, page, limit }],
    queryFn: () => getUserSubscriptionHistoryApi({ sort, search, page, limit }),
  });

  return {
    isError,
    isPending,
    subscriptions: subscriptions?.subscriptions,
    totalCount: subscriptions?.totalCount,
  };
}

export function useGetAllSubscriptions({ sort, search, page, limit = 10 }) {
  const {
    isError,
    isPending,
    data: subscriptions,
  } = useQuery({
    queryKey: ["allSubHistory", { sort, search, page, limit }],
    queryFn: () => getAllSubscriptionsApi({ sort, search, page, limit }),
  });

  return {
    isError,
    isPending,
    subscriptions: subscriptions?.subscriptions,
    totalCount: subscriptions?.totalCount,
  };
}
