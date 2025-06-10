import { IoDocumentTextOutline } from "react-icons/io5";
import { formatFileSize } from "../../helpers/FileReader";

export function SelectedUpload({ src, name, size, type, setSelectedID }) {
  return (
    <div className="border rounded-xl p-5 flex justify-between items-center mb-5">
      <div className="flex gap-5 items-center">
        {type === "application/pdf" ? (
          <IoDocumentTextOutline className="text-[7rem] text-blue-500" />
        ) : (
          <img
            src={src}
            alt={name}
            className="w-[7rem] h-[7rem] object-cover rounded-xl"
          />
        )}
        <div className="font-semibold text-slate-500">
          <p>{name}</p>
          <p>{formatFileSize(size)}</p>
        </div>
      </div>
      <span
        onClick={() => setSelectedID(null)}
        className="text-6xl text-rose-500 cursor-pointer"
      >
        &times;
      </span>
    </div>
  );
}
