export default function PropertyUnderReviewStatus({ reviewStatus }) {
  return (
    <p
      className={`mt-10 mb-20 p-8 bg-gradient-to-t ${
        reviewStatus == "pending"
          ? "from-yellow-500 to-yellow-600"
          : reviewStatus === "approved"
          ? " from-green-500 to-green-600"
          : "from-red-500 to-red-500"
      } text-white text-center rounded-3xl mt-20`}
    >
      {reviewStatus === "pending"
        ? "Thank you for submitting your property listing! Our team at Inspectra has received it and will get back to you within 48 hours."
        : reviewStatus === "approved"
        ? "Congratulations! Your property has been approved and is now live on the Inspectra Listing page."
        : "Unfortunately, your property listing did not meet our guidelines. Please review the requirements in your MAIL and feel free to notify the team after making the necessary adjustments."}
    </p>
  );
}
