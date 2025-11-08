import { FaRegCirclePlay } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function PropertyVideoRender({
  videoFile,
  videos,
  images,
  title,
}) {
  // const videoJsOptions = {
  //   autoplay: false,
  //   controls: true,
  //   responsive: true,
  //   fluid: true,
  //   poster: images[0].url, // Optional: first image as video thumbnail
  //   sources: [
  //     {
  //       src: videoFile?.url,
  //       type: "video/mp4",
  //     },
  //   ],
  // };

  // const handlePlayerReady = (player) => {
  //   player.on("waiting", () => {
  //     return "Video is buffering";
  //   });

  //   player.on("dispose", () => {
  //     return "Player disposed";
  //   });
  // };
  return (
    <>
      {" "}
      {/* {videoFile?.url ? (
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        ) : (
          videos && <VideoEmbedUrl videos={videos} />
        )} */}
      {(videoFile?.url || videos) && (
        <div className="h-[55rem] midmobile:h-[35rem] rounded-3xl overflow-hidden relative">
          <img
            src={images[0].url}
            alt={title + " Image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute bg-black bg-opacity-50 h-full w-full top-0 left-0 flex justify-center items-center">
            <Link
              to={videoFile?.url || videos}
              target="_blank"
              className="inline-flex focus:ring-4 ring-offset-2 items-center gap-3 px-10 py-5 smmobile:px-5 smmobile:py-5 rounded-full text-white bg-gradient-to-tr from-blue-500 to-blue-700 bg-[length:200%] bg-left hover:bg-right transition-all duration-500 ease justify-center cursor-pointer"
            >
              <FaRegCirclePlay className="text-[5rem] text-white" />
              <span className="smmobile:hidden">Watch Video</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
