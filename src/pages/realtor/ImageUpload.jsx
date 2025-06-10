import { IoImagesOutline } from "react-icons/io5";
import Button from "../../components/Button";

export function ImageUpload({
  btnLabel,
  uploadLabel,
  boldDescription,
  smallDescription,
  onHandleUpload,
  labelId,
}) {
  return (
    <div className="border-2 border-dashed border-slate-400 min-h-96 rounded-2xl flex flex-col items-center justify-center text-center p-5 mb-5">
      <Button variation="label" labelFor={labelId}>
        <IoImagesOutline size={24} />
        <span>{btnLabel}</span>
      </Button>
      <h3 className="heading-2 mt-8">{uploadLabel}</h3>
      <p className="text-2xl">{boldDescription}</p>
      <input
        type="file"
        accept=".jpg,.png,.webp,.pdf"
        className="hidden"
        id={labelId}
        onChange={onHandleUpload}
      />
      <p className="text-xl text-gray-500 mt-2">{smallDescription}</p>
    </div>
  );
}
