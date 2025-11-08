import { useEffect, useRef, useState } from "react";
import { getTagColor } from "../helpers/helpers";

export default function PropertyImageCarousel({
  images,
  listingStatus,
  urgencyTag,
}) {
  const [mainImage, setMainImage] = useState({
    src: images[0].url,
    status: listingStatus,
    isPortrait: null,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [orientations, setOrientations] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const detectOrientations = async () => {
      const promises = images.map((img) => {
        return new Promise((resolve) => {
          const i = new Image();
          i.src = img.url;
          i.onload = () => {
            resolve(i.naturalHeight > i.naturalWidth);
          };
        });
      });
      const results = await Promise.all(promises);
      setOrientations(results);

      setMainImage((prev) => ({ ...prev, isPortrait: results[0] }));
    };
    detectOrientations();
  }, [images]);

  const handleImageClick = (index) => {
    const clickedImage = images[index];

    setIsFading(true);

    setTimeout(() => {
      setMainImage({
        src: clickedImage.url,
        status: listingStatus,
        isPortrait: orientations[index],
      });
      setIsFading(false);
      setActiveIndex(index);
    }, 80);

    const clickedImageElement = document.getElementById(
      `carousel-item-${index}`
    );
    if (clickedImageElement && carouselRef.current) {
      const carouselWidth = carouselRef.current.offsetWidth;
      const clickedImageLeft = clickedImageElement.offsetLeft;
      const clickedImageWidth = clickedImageElement.offsetWidth;

      const scrollPosition =
        clickedImageLeft + clickedImageWidth / 2 - carouselWidth / 2;

      carouselRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div
        className={`relative overflow-hidden bg-blue-950 rounded-2xl h-[55rem] smmobile:h-[30rem] ring-2 ring-blue-500 transition-opacity duration-300 ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* <Link to={mainImage.src} target="_blank"> */}
        <img
          src={mainImage.src}
          alt="Main Property Image"
          className={`object-cover w-full h-full`}
        />
        <div className="absolute inset-0"></div>
        {/* </Link> */}
        <div className="absolute top-10 left-10 flex gap-5">
          {mainImage.status && (
            <div
              className={`py-2 capitalize px-5 bg-gradient-to-b ${
                mainImage.status === "shortlet"
                  ? "from-purple-100 to-purple-200 text-purple-700"
                  : mainImage.status === "rent"
                  ? "from-green-100 to-green-200 text-green-700"
                  : mainImage.status === "lease"
                  ? "from-orange-100 to-orange-200 text-orange-700"
                  : "from-sky-100 to-sky-200 text-sky-700"
              } rounded-xl flex justify-center`}
            >
              For {mainImage.status}
            </div>
          )}
          {urgencyTag && urgencyTag !== "none" && (
            <div
              className={`py-2 capitalize px-5 text-white ${getTagColor(
                urgencyTag
              )} rounded-xl flex justify-center`}
            >
              {urgencyTag}
            </div>
          )}
        </div>
      </div>
      <div
        ref={carouselRef}
        className="my-5 flex overflow-x-auto hide-scrollbar"
      >
        <div className="flex p-2 gap-5">
          {images.map((el, index) => {
            // const isPortrait = orientations[index];
            return (
              <div
                id={`carousel-item-${index}`}
                key={el._id}
                className={`relative ${
                  activeIndex === index ? "ring-2" : ""
                } ring-offset-2 ring-blue-500 rounded-2xl flex-shrink-0 cursor-pointer overflow-hidden w-72 flex justify-center`}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={el.url}
                  alt={`Property Listing Image ${index + 1}`}
                  className={`w-full h-40 object-cover shadow-md`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
