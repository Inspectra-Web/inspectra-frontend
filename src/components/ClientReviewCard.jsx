import { Link } from "react-router-dom";

export default function ClientReviewCard({ review }) {
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        className={`w-8 h-8 ${
          review.rating >= i ? "text-blue-400 fill-blue-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.107 3.407a1 1 0 00.95.69h3.584c.969 0 1.371 1.24.588 1.81l-2.899 2.1a1 1 0 00-.364 1.118l1.108 3.408c.3.921-.755 1.688-1.538 1.118l-2.9-2.1a1 1 0 00-1.175 0l-2.9 2.1c-.783.57-1.838-.197-1.538-1.118l1.108-3.408a1 1 0 00-.364-1.118l-2.899-2.1c-.783-.57-.38-1.81.588-1.81h3.584a1 1 0 00.95-.69l1.107-3.407z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white flex gap-5 p-5 rounded-lg cursor-default">
      <div className="w-24 h-24 shrink-0">
        <img
          src="https://res.cloudinary.com/djiwqyx17/image/upload/v1749684799/property_images/ikx3ba98k0ohsf3tzk76.jpg"
          alt=""
          className="w-full h-full rounded-lg"
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <Link className="hover:text-blue-500 duration-300 font-semibold text-lg text-gray-800">
            {review.propertyTitle}
          </Link>
          <div className="flex gap-1">{renderStars()}</div>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>

        <p className="text-2xl text-gray-700">{review.comment}</p>
      </div>
    </div>
  );
}
