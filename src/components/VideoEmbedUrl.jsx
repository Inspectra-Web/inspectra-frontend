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
    </>
  );
}
