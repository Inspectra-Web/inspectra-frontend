import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function PropertyImageCarousel({ images, listingStatus }) {
  const [mainImage, setMainImage] = useState({
    src: images[0].url,
    status: listingStatus,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const carouselRef = useRef(null);

  const handleImageClick = (index) => {
    const clickedImage = images[index];

    setIsFading(true);

    setTimeout(() => {
      setMainImage({
        src: clickedImage.url,
        status: listingStatus,
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
        className={`relative h-[55rem] smmobile:h-[30rem] transition-opacity duration-300 ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Link to={mainImage.src} target="_blank">
          <img
            src={mainImage.src}
            alt="Main Property Image"
            className="rounded-2xl h-full ring-2 ring-blue-500 w-full object-cover"
          />
        </Link>
        {mainImage.status && (
          <div
            className={`py-2 capitalize px-5 bg-gradient-to-b ${
              mainImage.status === "rent"
                ? "from-green-100 to-green-200 text-green-700"
                : mainImage.status === "lease"
                ? "from-orange-100 to-orange-200 text-orange-700"
                : "from-sky-100 to-sky-200 text-sky-700"
            } rounded-xl flex justify-center absolute top-10 left-10`}
          >
            For {mainImage.status}
          </div>
        )}
      </div>
      <div
        ref={carouselRef}
        className="my-5 flex overflow-x-auto hide-scrollbar"
      >
        <div className="flex p-2 gap-5">
          {images.map((el, index) => (
            <div
              id={`carousel-item-${index}`}
              key={el._id}
              className={`relative ${
                activeIndex === index ? "ring-2" : ""
              } ring-offset-2 ring-blue-500 rounded-2xl w-72 flex-shrink-0 cursor-pointer`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={el.url}
                alt={`Property Listing Image ${index + 1}`}
                className="h-40 rounded-2xl w-full object-cover shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
