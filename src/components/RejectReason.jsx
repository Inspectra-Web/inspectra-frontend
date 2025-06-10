import Button from "./Button";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { LoaderSm } from "../static/Loaders";

export default function RejectReason({
  reason,
  onSetReason,
  onSetShow,
  onManageDoc,
  isLoading,
}) {
  function onSubmit(e) {
    e.preventDefault();
    onManageDoc();
    onSetShow(false);
    onSetReason("");
  }
  return (
    <div className="fixed text-[1.6rem] top-0 left-0 w-full h-screen z-[1000] bg-slate-900 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-10 items-end w-[50rem] smmobile:w-full midmobile:p-10 bg-slate-900 p-20 rounded-3xl relative"
      >
        <span
          onClick={() => onSetShow(false)}
          className="cursor-pointer text-white text-6xl bg-red-500 w-14 h-14 flex items-center justify-center rounded-full"
        >
          &times;
        </span>
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="rejection" className="text-slate-500 font-semibold">
            Rejection reason
          </label>
          <textarea
            id="rejection"
            value={reason}
            className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-3xl h-40 px-10 py-5 placeholder:text-slate-500 text-slate-500 resize-none"
            placeholder="Explain reason for rejecting document"
            onChange={(e) => onSetReason(e.target.value)}
          ></textarea>
          <div className="mt-10">
            <Button disabled={isLoading}>
              {isLoading ? (
                <LoaderSm />
              ) : (
                <>
                  <span>Send</span>
                  <HiOutlinePaperAirplane size={24} className="rotate-90" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
