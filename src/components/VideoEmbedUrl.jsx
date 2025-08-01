import { getEmbedUrl } from "../helpers/helpers";

export default function VideoEmbedUrl({ videos }) {
  const embedUrl = getEmbedUrl(videos);

  return (
    <>
      {!embedUrl ? (
        <p>Invalid or Unsupported Video URL</p>
      ) : (
        <div className="w-full h-[55rem] pb-[56.25%] relative rounded-3xl smmobile:h-[30rem] overflow-hidden">
          <iframe
            src={embedUrl}
            title="Video Url"
            className="w-full h-full object-cover absolute top-0 left-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-lg text-sm mb-4">
        <strong>Note:</strong> Video rendering is currently optimized for{" "}
        <span className="font-medium">landscape orientation</span>. Portrait
        videos may appear cropped or not fully visible. We&apos;re working on
        improving this soon.
      </div>
    </>
  );
}
