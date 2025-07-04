import ClientReviewCard from "../../components/ClientReviewCard";
import IntroHeading from "../../components/IntroHeading";
const reviews = [
  {
    _id: "rev001",
    propertyTitle: "3-Bedroom Apartment in Lekki Phase 1",
    rating: 4,
    comment: "The apartment was spacious and well maintained. Smooth process.",
    createdAt: "2025-06-20T10:30:00Z",
  },
  {
    _id: "rev002",
    propertyTitle: "Studio Apartment in Yaba",
    rating: 5,
    comment: "Perfect for students. Everything worked well and was very clean.",
    createdAt: "2025-06-18T14:45:00Z",
  },
  {
    _id: "rev003",
    propertyTitle: "Duplex in Victoria Island",
    rating: 3,
    comment:
      "The location was good but the house needed a little renovation. Overall, decent stay.",
    createdAt: "2025-06-15T09:12:00Z",
  },
  {
    _id: "rev004",
    propertyTitle: "Self-Contained Apartment in Surulere",
    rating: 4,
    comment: "Nice and affordable. I liked the neighborhood too.",
    createdAt: "2025-06-10T18:00:00Z",
  },
  {
    _id: "rev005",
    propertyTitle: "4-Bedroom Duplex in Ikeja GRA",
    rating: 5,
    comment:
      "Absolutely loved the place. Very modern design, top-notch security, and responsive agent. I would definitely recommend this to others looking for a premium experience in Lagos. It felt like home from day one.",
    createdAt: "2025-06-08T13:25:00Z",
  },
  {
    _id: "rev006",
    propertyTitle: "Mini Flat in Ogba",
    rating: 2,
    comment: "Had plumbing issues. Took a while to fix.",
    createdAt: "2025-06-05T11:00:00Z",
  },
  {
    _id: "rev007",
    propertyTitle: "3-Bedroom Bungalow in Ajah",
    rating: 4,
    comment: "Neat and well-ventilated. The agent was punctual and helpful.",
    createdAt: "2025-06-02T16:40:00Z",
  },
  {
    _id: "rev008",
    propertyTitle: "Penthouse Apartment in Banana Island",
    rating: 5,
    comment:
      "Luxury at its finest. From the furnishings to the view, everything was on point. I had a fantastic experience. Great service throughout the lease period.",
    createdAt: "2025-05-30T08:15:00Z",
  },
];

export default function ClientReviews() {
  return (
    <section className="space-y-4">
      <IntroHeading label="My Reviews" />
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-sm">
          You haven’t written any reviews yet.
        </p>
      ) : (
        reviews.map((review) => (
          <ClientReviewCard key={review._id} review={review} />
        ))
      )}
    </section>
  );
}
