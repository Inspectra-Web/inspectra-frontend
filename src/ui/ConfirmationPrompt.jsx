import { AiOutlineAlert } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";

function ConfirmAction(onConfirm, info) {
  toast.dismiss();
  toast(
    ({ closeToast }) => (
      <>
        <button
          onClick={closeToast}
          className="absolute top-5 right-5 text-slate-300 hover:text-slate-500 duration-500 ease-linear outline-none"
        >
          <GrClose />
        </button>
        <AiOutlineAlert size={60} className="text-blue-500" />
        <h2 className="heading-2">Are you sure?</h2>
        <p className="text-slate-500 mb-14">{info}</p>
        <div className="flex items-center gap-10">
          <button
            onClick={closeToast}
            className="px-10 py-4 capitalize bg-red-500 text-red-50 rounded-md focus:ring-red-500 focus:ring-2 focus:ring-offset-2 transition-all ease-linear outline-none"
          >
            decline
          </button>
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="px-10 py-4 capitalize bg-blue-500 text-blue-50 rounded-md focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 transition-all ease-linear outline-none"
          >
            accept
          </button>
        </div>
      </>
    ),
    {
      className:
        "flex justify-center items-center text-center bg-white w-[60rem] h-[30rem] border border-t-4 border-t-blue-400 rounded-xl flex flex-col items-center justify-center relative toast_font smtablet:w-[50rem] smmobile:w-[35rem]",
      autoClose: false,
    }
  );
}

export function HandleConfirmation(apiActions, information) {
  ConfirmAction(function () {
    apiActions();
  }, information);
}
