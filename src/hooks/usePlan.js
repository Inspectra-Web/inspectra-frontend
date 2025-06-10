import { useQuery } from "@tanstack/react-query";
import { getPlans as getPlansApi } from "../services/apiPlan";
import { formatPlansForUI } from "../helpers/helpers";

export function useGetPlans() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlansApi,
    select: (res) => formatPlansForUI(res),
  });

  return { isError, isPending, plans: data || [] };
}
