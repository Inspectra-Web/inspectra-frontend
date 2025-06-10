import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  manageVerificationDoc as manageVerificationDocApi,
  readProfile as readProfileApi,
  updateProfile as updateProfileApi,
  uploadVerificationDoc as uploadVerificationDocApi,
} from "../services/apiProfile";
import { toast } from "react-toastify";
import { errData } from "../helpers/apiHelpers";

export function useReadProfile(id) {
  const { isPending, isError, data } = useQuery({
    queryKey: ["profileKey", id],
    queryFn: () => readProfileApi({ id }),
    enabled: !!id,
  });

  return { isPending, isError, profile: data?.profile };
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { mutate: updateData, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateProfileApi(id, data),
    onSuccess: (msg, variables) => {
      queryClient.invalidateQueries(["profileKey", variables.id]);
      toast.success(msg);
    },
    onError: errData,
  });

  return { updateData, isPending };
}

export function useUploadVerificationDoc() {
  const { mutate: uploadDoc, isPending } = useMutation({
    mutationFn: ({ id, data }) => uploadVerificationDocApi(id, data),
    onSuccess: () => toast.success("Document uploaded successfully"),
    onError: errData,
  });

  return { uploadDoc, isPending };
}

export function useManageVerificationDoc() {
  const queryClient = useQueryClient();
  const { mutate: manageDoc, isPending } = useMutation({
    mutationFn: ({ id, data }) => manageVerificationDocApi(id, data),
    onSuccess: (msg, variables) => {
      queryClient.invalidateQueries(["profileKey", variables.id]);
      toast.success(msg);
    },
    onError: errData,
  });

  return { manageDoc, isPending };
}
