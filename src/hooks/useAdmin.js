import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../services/apiAdmin";

export function useGetStatistics() {
  const { isPending, data } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStatistics,
  });

  return {
    isPending,
    propertyStats: data?.propertyStats,
    realtorStats: data?.realtorStats,
    inquiryStats: data?.inquiryStats,
    scheduleStats: data?.scheduleStats,
    subscriptionStats: data?.subscriptionStats,
  };
}
