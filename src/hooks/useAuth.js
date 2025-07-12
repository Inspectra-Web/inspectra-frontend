import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  otpVerify as otpVerifyApi,
  signup as signupApi,
  login as loginApi,
  getCurrentUser,
  logout as logoutApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
  deactivateAccount as deactivateAccountApi,
  activateAccount as activateAccountApi,
} from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { errData } from "../helpers/apiHelpers";

// Signup
export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (msg) => toast.success(msg),
    onError: errData,
  });

  return { signup, isPending };
}

// OTP Verify
export function useOtp() {
  const { mutate: otpData, isPending } = useMutation({
    mutationFn: otpVerifyApi,
    onSuccess: (msg) => toast.success(msg),
    onError: errData,
  });

  return { otpData, isPending };
}

// Forgot Password
export function useForgotPassword() {
  const { mutate: forgotData, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (msg) => toast.success(msg),
    onError: errData,
  });

  return { forgotData, isPending };
}

// Reset Password
export function useResetPassword() {
  const navigate = useNavigate();
  const { mutate: resetData, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (msg) => {
      toast.success(msg);
      navigate("/sign-in", { replace: true });
    },
    onError: errData,
  });

  return { resetData, isPending };
}

// Login
export function useLogin() {
  const queryClient = new QueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      toast.success(
        `You are welcome, ${user.fullname.toUpperCase().split(" ")[0]}`
      );
      queryClient.setQueryData(["userKey"], user);
    },
    onError: errData,
  });

  return { login, isPending };
}

// Get current user
export function useUser() {
  const {
    isPending,
    data: user,
    isError,
  } = useQuery({
    queryKey: ["userKey"],
    queryFn: getCurrentUser,
    staleTime: 0,
  });

  return { isPending, isError, user, isAuthenticated: !!user };
}

// Logout
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: (msg) => {
      queryClient.removeQueries();
      toast.success(msg);
      navigate("/sign-in", { replace: true });
    },
  });

  return { logout, isPending };
}

export function useDeactivateAccount() {
  const queryClient = useQueryClient();
  const { mutate: deactivate, isPending: isDeactivating } = useMutation({
    mutationFn: ({ id, data }) => deactivateAccountApi(id, data),
    onSuccess: (msg, variables) => {
      queryClient.invalidateQueries(["deactivateKey", variables.id]);
      toast.success(msg);
    },
    onError: errData,
  });

  return { deactivate, isDeactivating };
}

export function useActivateAccount() {
  const queryClient = useQueryClient();
  const { mutate: activate, isPending: isActivating } = useMutation({
    mutationFn: ({ id, data }) => activateAccountApi(id, data),
    onSuccess: (msg, variables) => {
      queryClient.invalidateQueries(["activateKey", variables.id]);
      toast.success(msg);
    },
    onError: errData,
  });

  return { activate, isActivating };
}
