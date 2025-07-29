import { useQuery } from "@tanstack/react-query";
import { allClients as allClientsApi } from "../services/apiClients";

export function useAllClients({ sort, search, page, limit = 10 }) {
  const { isPending, isError, data } = useQuery({
    queryKey: ["clientKey", { sort, search, page, limit }],
    queryFn: () => allClientsApi({ sort, search, page, limit }),
  });

  return {
    isError,
    isPending,
    clients: data?.clients,
    totalCount: data?.totalCount,
  };
}
