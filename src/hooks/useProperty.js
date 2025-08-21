import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addPropertyListing as addPropertyListingApi,
  deletePropertyListing as deletePropertyListingApi,
  getFeaturedListings as getFeaturedListingsApi,
  getLastestPropertyListings as getLastestPropertyListingsApi,
  getPropertyListings as getPropertyListingsApi,
  getPropertyListingsInfinite,
  getRealtorListings as getRealtorListingsApi,
  getRealtorListingsMain as getRealtorListingsMainApi,
  myPropertyListings as myPropertyListingsApi,
  onePropertyListing as onePropertyListingApi,
  onePropertyListingBySlug as onePropertyListingBySlugApi,
  updateListingReviewStatus as updateListingReviewStatusApi,
} from "../services/apiProperties";
import { toast } from "react-toastify";
import { errData } from "../helpers/apiHelpers";
import { useNavigate } from "react-router-dom";

export function useAddPropertyListing() {
  const queryClient = useQueryClient();
  const { mutate: addProperty, isPending } = useMutation({
    mutationFn: ({ id, data }) => addPropertyListingApi(id, data),
    onSuccess: (msg, variables) => {
      queryClient.invalidateQueries(["propertyKey", variables.id]);
      toast.success(msg);
    },
    onError: errData,
  });

  return { addProperty, isPending };
}

export function useMyPropertyListings({ sort, search, page, limit = 10 }) {
  const {
    isError,
    isPending,
    data: properties,
  } = useQuery({
    queryKey: ["propertyKey", { sort, search, page, limit }],
    queryFn: () => myPropertyListingsApi({ sort, search, page, limit }),
  });

  return {
    isError,
    isPending,
    properties: properties?.properties,
    totalCount: properties?.totalCount,
  };
}

export function useGetLastestPropertyListings() {
  const {
    isPending,
    isError,
    data: properties,
  } = useQuery({
    queryKey: ["propertyKey"],
    queryFn: getLastestPropertyListingsApi,
  });

  return { isPending, isError, properties: properties?.properties };
}

export function useGetPropertyListings({
  sort,
  search,
  page,
  limit = 10,
  reviewStatus,
}) {
  const {
    isPending,
    isError,
    data: properties,
  } = useQuery({
    queryKey: ["propertyKey", { sort, search, page, limit }],
    queryFn: () =>
      getPropertyListingsApi({ sort, search, page, limit, reviewStatus }),
  });
  return {
    isError,
    isPending,
    properties: properties?.properties,
    counts: properties?.counts,
  };
}

// export function useGetPropertyListingsInfinite({
//   sort,
//   search,
//   type,
//   status,
//   category,
//   location,
//   limit = 10,
// }) {
//   return useInfiniteQuery({
//     queryKey: [
//       "propertyInfinite",
//       { sort, search, type, status, category, location },
//     ],
//     queryFn: ({ pageParam = 1 }) =>
//       getPropertyListingsInfinite({
//         sort,
//         search,
//         page: pageParam,
//         limit,
//         type,
//         status,
//         category,
//         location,
//       }),
//     getNextPageParam: (lastPage, allPages) =>
//       lastPage.properties.length < limit ? undefined : allPages.length + 1,
//   });
// }

export function useGetPropertyListingsInfinite({
  sort,
  filters = {},
  limit = 10,
  search = "",
}) {
  return useInfiniteQuery({
    queryKey: ["propertyInfinite", { sort, ...filters, search }],
    queryFn: ({ pageParam = 1 }) =>
      getPropertyListingsInfinite({
        sort,
        ...filters,
        page: pageParam,
        limit,
        search,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.properties.length < limit ? undefined : allPages.length + 1,
  });
}

export function useOnePropertyListing(id) {
  const isValid = Boolean(id);
  const { isPending, isError, data } = useQuery({
    queryKey: ["propertyKey", id],
    queryFn: () => onePropertyListingApi(id),
    enabled: isValid,
  });

  return {
    isPending: isValid ? isPending : false,
    isError,
    property: data?.property,
    realtor: data?.realtor,
  };
}

export function useOnePropertyListingBySlug(slug) {
  const isValid = Boolean(slug);
  const { isPending, isError, data } = useQuery({
    queryKey: ["propertySlugKey", slug],
    queryFn: () => onePropertyListingBySlugApi(slug),
    enabled: isValid,
  });

  return {
    isPending: isValid ? isPending : false,
    isError,
    property: data?.property,
    realtor: data?.realtor,
  };
}

export function useDeletePropertyListing(id) {
  const navigate = useNavigate();
  const { isPending, mutate: deleteListing } = useMutation({
    mutationFn: () => deletePropertyListingApi(id),
    onSuccess: (msg) => {
      toast.success(msg);
      navigate(`/app/property-listings`);
    },
    onError: (error) => toast.error(error),
  });

  return { isPending, deleteListing };
}

export function useUpdateListingReviewStatus() {
  const queryClient = useQueryClient();
  const { mutate: updateReviewStatus, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateListingReviewStatusApi(id, data),
    onSuccess: (msg, variables) => {
      queryClient.invalidateQueries(["property3Key", variables.id]);
      toast.success(msg);
    },
    onError: errData,
  });

  return { updateReviewStatus, isPending };
}

export function useGetRealtorListings() {
  const { isPending: isLoading, data } = useQuery({
    queryKey: ["propertyKey"],
    queryFn: getRealtorListingsApi,
  });

  return { isLoading, properties: data?.properties };
}

export function useGetFeaturedListings() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["featuredListings"],
    queryFn: getFeaturedListingsApi,
  });

  return { isPending, isError, data };
}

export function useGetRealtorListingsMain(userId, limit = 10) {
  const {
    isError,
    isPending: isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["realtorListings", userId],
    queryFn: ({ pageParam = 1 }) =>
      getRealtorListingsMainApi({ userId, pageParam, limit }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!userId,
  });
  const properties = data?.pages.flatMap((page) => page.data.properties) ?? [];
  const totalCount = data?.pages.flatMap((page) => page.total) ?? [];
  return {
    isError,
    isLoading,
    totalProperties: totalCount[0],
    properties,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
