import { useEffect, useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import Button from "../../../components/Button";

export default function PropertyVideoUpload({ setValue, videoFile }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoError, setVideoError] = useState("");

  useEffect(() => {
    return () => {
      if (selectedVideo) {
        URL.revokeObjectURL(selectedVideo);
      }
    };
  }, [selectedVideo]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validFormats = ["video/mp4", "video/avi", "video/mov", "video/mkv"];
      if (!validFormats.includes(file.type))
        return setVideoError(
          "Invalid format. Please upload an MP4, AVI, or MOV file."
        );

      if (file.size > 10 * 1024 * 1024)
        return setVideoError(
          "File size too large. Maximum allowed size is 10MB."
        );

      setVideoError("");
      setValue("videoFile", file);
      if (selectedVideo) {
        URL.revokeObjectURL(selectedVideo);
      }

      const newVideoUrl = URL.createObjectURL(file);
      setSelectedVideo(newVideoUrl);
    }
  };
  return (
    <>
      <div className="border-2 border-dashed border-slate-400 min-h-96 rounded-2xl flex flex-col items-center justify-center mb-10 p-5 text-center">
        <Button variation="label" labelFor="video-upload">
          <HiOutlineVideoCamera size={24} />
          <span>Select Video</span>
        </Button>
        <h3 className="heading-2 mt-8">Upload your property video here</h3>
        <p className="text-2xl">
          Recommended: High-quality video (1080p or 720p). Max size: 10MB.
        </p>
        <input
          type="file"
          accept=".mp4,.avi,.mov,.mkv"
          className="hidden"
          id="video-upload"
          onChange={handleVideoChange}
        />
        <p className="text-xl text-gray-500 mt-2">
          Accepted formats: MP4, AVI, MOV | A short 1-2 minute video is ideal.
        </p>
      </div>
      {videoFile && (
        <video
          controls
          className="w-full h-[50rem] midmobile:h-[30rem] object-cover rounded-2xl"
        >
          <source src={videoFile?.url} type="video/mp4" />
        </video>
      )}
      {selectedVideo && (
        <div className="shadow-md rounded-2xl overflow-hidden">
          <video
            key={selectedVideo}
            controls
            className="w-full h-[50rem] object-cover"
          >
            <source src={selectedVideo} type="video/mp4" />
          </video>
          <p className="text-center p-2 text-slate-500">
            Preview of your selected video
          </p>
        </div>
      )}

      <p className="text-red-500 text-center mt-4">{videoError}</p>
    </>
  );
}
