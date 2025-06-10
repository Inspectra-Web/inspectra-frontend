import { useQuery } from "@tanstack/react-query";
import { allRealtors as allRealtorsApi } from "../services/apiRealtors";

export function useAllRealtors({ sort, search, page, limit = 10 }) {
  const { isPending, isError, data } = useQuery({
    queryKey: ["realtorsKey", { sort, search, page, limit }],
    queryFn: () => allRealtorsApi({ sort, search, page, limit }),
  });

  return {
    isError,
    isPending,
    realtors: data?.realtors,
    totalCount: data?.totalCount,
  };
}
