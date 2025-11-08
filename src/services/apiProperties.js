import { apiClient, handleError, handleResponse } from "../helpers/apiHelpers";

export async function addPropertyListing(id, data) {
  try {
    let response;
    if (!id) {
      response = await apiClient.post(`/property/add-property`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      response = await apiClient.patch(`/property/add-property/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function myPropertyListings({
  sort = "",
  search = "",
  page = 1,
  limit = 10,
}) {
  try {
    const query = new URLSearchParams();

    if (search.trim() !== "") query.append("search", search);
    if (sort) query.append("sort", sort);
    query.append("page", page);
    query.append("limit", limit);

    const response = await apiClient.get(
      `/property/my-listings?${query.toString()}&fields=_id,images,title,features.yearBuilt,type,listingStatus,category,address.city,price`
    );

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function onePropertyListing(id) {
  try {
    const response = await apiClient.get(`/property/${id}`);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function onePropertyListingBySlug(slug) {
  try {
    const response = await apiClient.get(`/property/slug/${slug}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getLastestPropertyListings() {
  try {
    const response = await apiClient.get(`/property/lastest-listings`);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getPropertyListings({
  sort = "",
  search = "",
  page = 1,
  limit = 10,
  reviewStatus,
}) {
  try {
    const query = new URLSearchParams();

    if (search.trim() !== "") query.append("search", search);
    if (sort) query.append("sort", sort);
    query.append("page", page);
    query.append("limit", limit);

    const response = await apiClient.get(
      `/property/all-listings?${query.toString()}&fields=_id,images,title,features.yearBuilt,type,listingStatus,category,address.city,reviewStatus,price&${
        reviewStatus && `reviewStatus=${reviewStatus}`
      }`
    );

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getPropertyListingsInfinite({
  sort,
  page = 1,
  limit = 10,
  type,
  listingStatus,
  category,
  location,
  search,
}) {
  try {
    const params = new URLSearchParams();

    if (search.trim() !== "") params.append("search", search);
    if (sort) params.append("sort", sort);
    params.append("page", page);
    params.append("limit", limit);

    if (type) params.append("type", type);
    if (listingStatus) params.append("listingStatus", listingStatus);
    if (category) params.append("category", category);
    if (location) params.append("address.city", location);

    const response = await apiClient.get(
      `/property/all-listings-infinite?${params.toString()}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export async function updateListingReviewStatus(id, data) {
  try {
    const response = await apiClient.patch(`/property/${id}`, data);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function deletePropertyListing(id) {
  try {
    const response = await apiClient.delete(`/property/${id}`);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getRealtorListings() {
  try {
    const response = await apiClient.get("/property/populate-my-listings");

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getRealtorListingsMain({
  userId,
  pageParam = 1,
  limit = 10,
}) {
  try {
    const response = await apiClient.get(
      `/property/populate-my-listings/${userId}?page=${pageParam}&limit=${limit}`
    );
    return response?.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getFeaturedListings() {
  try {
    const response = await apiClient.get(`/property/featured`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteLegalDocument(propertyId, documentId) {
  try {
    const response = await apiClient.delete(
      `/property/${propertyId}/legal-documents/${documentId}`
    );

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
