import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useParams,
} from "react-router-dom";
import RealtorDashboard from "./pages/realtor/RealtorDashboard";
import Overview from "./pages/realtor/Overview";
import PropertyListing from "./pages/realtor/PropertyListing";
import AddProperty from "./pages/realtor/AddProperty";
import Profile from "./pages/realtor/Profile";
import Help from "./pages/realtor/Help";
import ManageProperty from "./pages/realtor/ManageProperty";
import ProfileSettings from "./pages/realtor/ProfileSettings";
import ProfileVerification from "./pages/realtor/ProfileVerification";
import RealtorsListing from "./pages/admin/RealtorsListing";
import PendingListings from "./pages/admin/PendingListings";
import AllPropertyListings from "./pages/admin/AllPropertyListings";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SuccessPage from "./pages/auth/SuccessPage";
import SessionExpiredPage from "./pages/auth/SessionExpiredPage";
import OtpForm from "./pages/auth/OtpForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import ProtectRoute from "./routes/ProtectRoute";
import ResetPassword from "./pages/auth/ResetPassword";
import HomePage from "./pages/home/HomePage";
import MainPage from "./pages/home/MainPage";
import ListingsPage from "./pages/home/ListingsPage";
import ListingDetailPage from "./pages/home/ListingDetailPage";
import RealtorDetailPage from "./pages/home/RealtorDetailPage";
import PropertyInquiryForm from "./pages/home/PropertyInquiryForm";
import ClientsInquiry from "./pages/realtor/ClientsInquiry";
import { ScrollToTopClick } from "./components/ScrollToTop";
import AboutInspectraPage from "./pages/home/AboutInspectraPage";
import RealtorsPage from "./pages/home/RealtorsPage";
import PricingsPage from "./pages/home/PricingsPage";
import PropertyInspectionForm from "./pages/home/PropertyInspectionForm";
import ClientsInspection from "./pages/realtor/ClientsInspection";
import LiveChatPage from "./pages/chat/LiveChatPage";
import TermsOfUse from "./ui/TermsOfUse";
import PrivacyPolicy from "./ui/PrivacyPolicy";
import AllClientsInquiry from "./pages/realtor/AllClientsInquiry";
import AllClientsInspection from "./pages/realtor/AllClientsInspection";
import SubscriptionHistory from "./pages/realtor/SubscriptionHistory";
import AllSubscriptions from "./pages/realtor/AllSubscriptions";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientOverview from "./pages/client/ClientOverview";
import ClientSettings from "./pages/client/ClientSettings";
import ClientReviews from "./pages/client/ClientReviews";
import ClientInspections from "./pages/client/ClientInspections";
import ClientSavedProperties from "./pages/client/ClientSavedProperties";
import Unauthorized from "./routes/Unauthorized";
import ClientInquiries from "./pages/client/ClientInquiries";
import ClientChatPage from "./pages/chat/ClientChatPage";
import SocketProvider from "./context/SocketProvider";
import NotFoundPage from "./error/NotFoundPage";
import ErrorFallback from "./error/ErrorFallBack";
import ClientsListing from "./pages/admin/ClientsListing";
import InspectionManagement from "./pages/realtor/InspectionManagement";

function RedirectToNewPath() {
  const { slug } = useParams();
  return <Navigate to={`/listing/${slug}`} replace />;
}

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MainPage />
        <ScrollToTopClick containerSelector=".mainpage" />
      </>
    ),
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <AboutInspectraPage /> },
      { path: "/listings", element: <ListingsPage /> },
      { path: "/realtors", element: <RealtorsPage /> },
      { path: "/listing-detail/:slug", element: <RedirectToNewPath /> },
      { path: "/listing/:slug", element: <ListingDetailPage /> },
      { path: "/realtor-detail/:id", element: <RealtorDetailPage /> },
      { path: "/top-listings", element: <HomePage /> },
      { path: "/pricings", element: <PricingsPage /> },
      { path: "/terms", element: <TermsOfUse /> },
      { path: "/privacy", element: <PrivacyPolicy /> },
    ],
  },
  {
    path: "/property-inquiry-form/:id",
    element: (
      <ProtectRoute allowedRoles={["client"]}>
        <PropertyInquiryForm />
      </ProtectRoute>
    ),
  },
  {
    path: "/property-inspection-form/:id",
    element: (
      <ProtectRoute allowedRoles={["client"]}>
        <PropertyInspectionForm />
      </ProtectRoute>
    ),
  },
  {
    path: "/sign-up",
    element: <SignUpForm />,
  },
  {
    path: "/sign-in",
    element: <SignInForm />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  { path: "/verify-otp/:otpToken", element: <OtpForm /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
  { path: "/verify/:token", element: <SuccessPage /> },
  { path: "/session-expire", element: <SessionExpiredPage /> },
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/client", element: <Navigate to="/client/dashboard" /> },
  {
    path: "/client",
    element: (
      <ProtectRoute allowedRoles={["client", "admin"]}>
        <ClientDashboard />
        <ScrollToTopClick containerSelector=".client-dashboard" />
      </ProtectRoute>
    ),
    errorElement: <ErrorFallback />,
    children: [
      { index: true, path: "/client/dashboard", element: <ClientOverview /> },
      { path: "/client/settings", element: <ClientSettings /> },
      { path: "/client/reviews", element: <ClientReviews /> },
      { path: "/client/schedules", element: <ClientInspections /> },
      { path: "/client/favourites", element: <ClientSavedProperties /> },
      { path: "/client/live-chat", element: <ClientChatPage /> },
      { path: "/client/inquiries", element: <ClientInquiries /> },
      {
        path: "/client/inspection-management/:inspectionId",
        element: <InspectionManagement />,
      },
    ],
  },
  { path: "/app", element: <Navigate to="/app/overview" /> },
  {
    path: "/app",
    element: (
      <ProtectRoute allowedRoles={["admin"]}>
        <RealtorDashboard />
        <ScrollToTopClick containerSelector=".realtor-dashboard" />
      </ProtectRoute>
    ),
    errorElement: <ErrorFallback />,
    children: [
      { path: "/app/all-subscriptions", element: <AllSubscriptions /> },
      // { path: "add-a-realtor", element: <AddRealtor /> },
      { path: "/app/realtors-list", element: <RealtorsListing /> },
      { path: "/app/clients-list", element: <ClientsListing /> },
      // { path: "verification-requests", element: <VerificationRequests /> },
      { path: "/app/pending-properties", element: <PendingListings /> },
      { path: "/app/all-property-listings", element: <AllPropertyListings /> },
      { path: "/app/all-inquiries", element: <AllClientsInquiry /> },
      {
        path: "/app/all-scheduled-inspections",
        element: <AllClientsInspection />,
      },
    ],
  },
  {
    path: "/app",
    element: (
      <ProtectRoute allowedRoles={["realtor", "admin"]}>
        <RealtorDashboard />
        <ScrollToTopClick containerSelector=".realtor-dashboard" />
      </ProtectRoute>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        path: "/app/overview",
        element: <Overview />,
      },
      { path: "/app/subscription-history", element: <SubscriptionHistory /> },
      {
        path: "/app/inspection-management/:inspectionId",
        element: <InspectionManagement />,
      },
      {
        path: "/app/help",
        element: <Help />,
      },
      {
        path: "/app/add-property",
        element: <AddProperty />,
      },
      { path: "/app/update-property/:id", element: <AddProperty /> },
      {
        path: "/app/property-listings",
        element: <PropertyListing />,
      },
      { path: "/app/inquiries", element: <ClientsInquiry /> },
      { path: "/app/schedules", element: <ClientsInspection /> },
      { path: "/app/live-chat", element: <LiveChatPage /> },
      {
        path: "/app/manage-property/:propertyId",
        element: <ManageProperty />,
      },
      {
        path: "/app/profile",
        element: <Profile />,
      },
      {
        path: "/app/profile/:id",
        element: <Profile />,
      },
      {
        path: "/app/profile-settings",
        element: <ProfileSettings />,
      },
      {
        path: "/app/profile-settings/:profileId/:userId",
        element: <ProfileSettings />,
      },
      {
        path: "/app/profile-verification",
        element: <ProfileVerification />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" /> */}
          <ToastContainer
            theme="colored"
            position="top-center"
            toastClassName="!font-sans"
          />
          <RouterProvider router={Router} />
        </SocketProvider>
      </QueryClientProvider>
    </>
  );
}
