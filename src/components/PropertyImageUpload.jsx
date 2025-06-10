import { useEffect, useState } from "react";
import Button from "./Button";
import { IoImagesOutline } from "react-icons/io5";
import {
  formatFileSize,
  handleImageChange,
  removeImage,
} from "../helpers/FileReader";
import { HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";

export function PropertyImageUpload({
  setImages,
  selectedImages,
  setSelectedImages,
  register,
  errors,
  existingImages = [],
  onRemoveExistingImage,
}) {
  const [error, setError] = useState("");
  const [storedImages, setStoredImages] = useState([]);
  useEffect(() => {
    if (existingImages.length) setStoredImages(existingImages);
  }, [existingImages]);

  return (
    <>
      <div className="border-2 border-dashed border-slate-400 min-h-96 rounded-2xl flex flex-col items-center justify-center text-center p-5 mb-5">
        <Button variation="label" labelFor="upload">
          <IoImagesOutline size={24} />
          <span>Select Images</span>
        </Button>
        <h3 className="heading-2 mt-8">Upload your property images here</h3>
        <p className="text-2xl">
          Recommended: High-resolution landscape images (1920 x 1080px or more).
        </p>
        <input
          type="file"
          multiple
          accept=".jpg,.png,.webp,.svg"
          className="hidden"
          id="upload"
          {...register("images", {
            validate: () =>
              selectedImages.length > 0 ||
              storedImages.length > 0 ||
              "Upload Images of the property listing",
          })}
          onChange={(e) => {
            handleImageChange(e, setSelectedImages, setError, setImages);
          }}
        />
        <p className="text-xl text-gray-500 mt-2">
          Accepted formats: JPG, PNG, WebP, SVG recommended.
        </p>
      </div>

      {selectedImages.length > 0 && (
        <div className="grid grid-cols-5 gap-8 midtablet:grid-cols-3 midmobile:grid-cols-2 sm:grid-cols-1 my-10">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative inline-block">
              <img
                src={image.src}
                alt={`${image.name}`}
                className="h-44 midtablet:h-52 rounded-2xl w-full object-cover shadow-md"
              />
              <p className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white font-bold p-2 bg-gradient-to-t from-blue-500 to-blue-700 rounded-2xl cursor-none">
                {formatFileSize(image.size)}
              </p>
              <span
                className="absolute top-3 right-3 rounded-full cursor-pointer text-white w-14 h-14 bg-slate-700 opacity-60 flex items-center justify-center"
                onClick={() => removeImage(index, setSelectedImages, setImages)}
              >
                <HiOutlineTrash size={18} />
              </span>
            </div>
          ))}
        </div>
      )}

      {storedImages.length > 0 && (
        <div className="grid grid-cols-5 gap-8 midtablet:grid-cols-3 midmobile:grid-cols-2 sm:grid-cols-1">
          {storedImages.map((image, index) => (
            <div key={image._id || index} className="relative inline-block">
              <Link to={image.url} target="_blank">
                <img
                  src={image.url}
                  alt={`Property Image ${index + 1}`}
                  className="h-44 midtablet:h-52 rounded-2xl w-full object-cover shadow-md"
                />
              </Link>
              <span
                className="absolute top-3 right-3 rounded-full cursor-pointer text-white w-14 h-14 bg-red-600 opacity-80 flex items-center justify-center"
                onClick={() => {
                  onRemoveExistingImage(image);
                  setStoredImages((prev) =>
                    prev.filter((img) => img._id !== image._id)
                  );
                }}
              >
                <HiOutlineTrash size={18} />
              </span>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}
      {errors && !selectedImages.length && (
        <p className="text-red-500 text-center text-3xl">
          {errors?.images?.message}
        </p>
      )}
    </>
  );
}
