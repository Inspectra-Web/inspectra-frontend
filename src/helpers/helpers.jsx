import defaultMale from "../assets/default-male.webp";
import defaultFemale from "../assets/default-female.jpg";

export const defaultAvatar = (gender) =>
  `${gender === "female" ? defaultFemale : defaultMale}`;

export const formatUnit = (value) => {
  if (value >= 1_000_000_000)
    return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  else if (value >= 1_000_000)
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  else if (value >= 1_000)
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  else value?.toString();
};

export const formatAmount = (amount) => {
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

  return formattedAmount;
};

export const amenitiesList = [
  "Water Treatment Plant",
  "Electricity Supply",
  "Backup Generator",
  "Air Conditioning",
  "Heating",
  "High-speed Internet",
  "24/7 Security",
  "Swimming Pool",
  "Gym",
  "Garage",
  "Concierge Service",
  "Elevator",
  "On-site Maintenance",
  "Fully Equipped Kitchen",
  "Refrigerator",
  "Dishwasher",
  "Washer / Dryer",
  "Balcony",
  "Smart Home Features",
  "Pet-Friendly",
  "Gated Community",
  "Video Doorbell",
  "Bathtub / Jacuzzi",
  "Water Supply",
  "Overhead Water Tank",
  "Prepaid Meter",
  "Generator House",
  "Security Post",
  "Secured Fences",
  "Tiled Floors",
  "Solar Inverters",
  "CCTV System",
  "Secured Estate",
  "Drainage System",
  "Concrete Driveway",
  "PVC Piping",
  "Sewage System",
  "Outdoor Bar",
  "Interlocked Compound",
  "Furnished Living Room",
  "Spacious Loading Area",
  "Easy Access Roads",
];

export const listingVariations = ["New", "Coming-soon", "Featured"];

export const listingVariationsAdmin = [
  "Premium",
  "Featured",
  "New",
  "Hot",
  "Trending",
  "Exclusive",
  "Luxury",
  "Popular",
  "Best-deal",
  "Price-reduced",
  "Coming-soon",
];

export const transformDataToObject = (dataArray, optionArr) => {
  const obj = {};
  optionArr.forEach((data) => {
    obj[data] = dataArray.includes(data);
  });
  return obj;
};

export const extractVideoId = (url) => {
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|user\/\S*#\S*v=))([^?&\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null; // Returns the videoId or null if invalid URL
};

export const getEmbedUrl = (url) => {
  if (!url) return null;

  // Youtube
  const youtubeMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|user\/\S*#\S*v=))([^?&\s]{11})/
  );

  if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`;

  // Vimeo
  const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/);

  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  // Facebook Short Links
  const facebookShortMatch = url.match(
    /(?:https?:\/\/)?(?:fb\.watch\/)([\w]+)/
  );
  if (facebookShortMatch) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      `https://www.facebook.com/watch/?v=${facebookShortMatch[1]}`
    )}&show_text=false`;
  }

  // Facebook Regular Links
  const facebookMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:video\.php\?v=|watch\/?\?v=|[^/]+\/videos\/)(\d+)/
  );
  if (facebookMatch) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      url
    )}&show_text=false`;
  }

  return null;
};

export const getPropertyCountByReviewStatus = (properties, status) =>
  properties?.filter((property) => property.reviewStatus === status).length;

export const getPropertyCountBylistingStatus = (properties, status) =>
  properties?.filter((property) => property.listingStatus === status).length;

export const getTotalViews = (properties) =>
  properties?.reduce((total, property) => total + (property.views || 0), 0);

export const getTotalInquiries = (properties) =>
  properties?.reduce((total, property) => total + (property.inquiries || 0), 0);

export const formatPlansForUI = (apiPlans) => {
  const groupedPlans = {};

  apiPlans?.forEach((plan) => {
    const key = plan.name.toLowerCase();
    if (!groupedPlans[key]) {
      groupedPlans[key] = {
        heading: plan.name,
        description: getDescription(plan.name),
        btnLabel: "Subscribe Plan",
        monthly: null,
        yearly: null,
        popular: plan.name === "Professional",
      };
    }

    const transformedFeatures = convertFeaturesToList(plan.features, plan.name);

    if (plan.interval === "monthly") {
      groupedPlans[key].monthly = {
        price: plan.amount,
        features: transformedFeatures,
        planId: plan._id,
        flutterwavePlanId: plan.flutterwavePlanId,
        planToken: plan.planToken,
      };
    } else if (plan.interval === "yearly") {
      groupedPlans[key].yearly = {
        price: plan.amount,
        features: transformedFeatures,
        planId: plan._id,
        flutterwavePlanId: plan.flutterwavePlanId,
        planToken: plan.planToken,
      };
    }
  });

  return Object.values(groupedPlans);
};

const getDescription = (planName) => {
  switch (planName) {
    case "Starter":
      return "Designed for new or independent realtors just getting started or trying out Inspectra.";
    case "Professional":
      return "Perfect for realtors looking to scale, get more leads and join an agency.";
    case "Agency":
      return "Registered real estate firms that want to go full digital and manage everything in one place.";
    default:
      return "";
  }
};

const convertFeaturesToList = (features, name) => {
  const isProfessional = name === "Professional";
  const isAgency = name === "Agency";
  return [
    { yes: true, text: `Maximum of ${features.maxListings} Listings` },
    // { yes: features.canHandleInspectionFees, text: "Inspection Fee Handling" },
    { yes: features.hasMapIntegration, text: "Map Integration" },
    {
      yes: features.featuredListings > 0,
      text: `${
        features.featuredListings > 0 ? features.featuredListings : ""
      } Featured Listings`,
    },
    { yes: features.canJoinAgency, text: "Join an Agency" },
    { yes: features.canCreateAgency, text: "Create an Agency" },
    { yes: features.directInquiries, text: "Direct Inquiries from Clients" },
    { yes: true, text: "Listing Management Tools" },
    { yes: true, text: "Live Chats" },
    { yes: true, text: "Analytics" },
    { yes: true, text: "Priority Support" },
    // { yes: false, text: "Virtual Tours (Pending)" },
    // { yes: false, text: "Off-Platform Advertizing" },
    {
      yes: true,
      text: isAgency
        ? "Maximum Profile Visibility"
        : isProfessional
        ? "High Profile Visibility"
        : "Standard Profile Visibility",
    },
    { yes: features.canCreateAgency, text: "Team Management Tools" },
    { yes: features.canCreateAgency, text: "Add & Manage Agents" },
    { yes: features.canCreateAgency, text: "Agent Performance Tracking" },
  ];
};

export const formatNigerianPhoneNumber = (input) => {
  // Remove all non-digit characters
  const digits = input.replace(/\D/g, "");

  // Remove leading zero if it exists
  let normalized = digits;
  if (digits.startsWith("0")) {
    normalized = "234" + digits.slice(1);
  } else if (!digits.startsWith("234")) {
    normalized = "234" + digits;
  }

  // Make sure it's exactly 13 digits (234 + 10-digit number)
  if (normalized.length !== 13) return null;

  // Format as +234 811 951 1582
  const countryCode = "+234";
  const line = normalized.slice(3); // remove 234
  return `${countryCode} ${line.slice(0, 3)} ${line.slice(3, 6)} ${line.slice(
    6,
    10
  )}`;
};
