import { GoVerified } from "react-icons/go";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { HandleConfirmation } from "../../../ui/ConfirmationPrompt";

export default function LegalDocumentPreview({
  index,
  activeView,
  setActiveView,
  isDeletingDoc,
  deleteDoc,
}) {
  console.log(activeView.id);
  return (
    <div
      key={index}
      className="fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-sm bg-black/60"
    >
      <div className="bg-white rounded-xl w-full max-w-7xl p-4 relative shadow-xl">
        <button
          onClick={() => setActiveView(null)}
          className="text-6xl absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">{activeView.label}</h2>{" "}
          {activeView.verified ? (
            <GoVerified className="text-[2.4rem] text-green-500" />
          ) : (
            <RxCounterClockwiseClock className="text-[2.4rem] text-yellow-500" />
          )}
          <button
            className="bg-red-500 px-4 py-2 text-white rounded-3xl"
            disabled={isDeletingDoc}
            onClick={() => {
              HandleConfirmation(
                () => deleteDoc(activeView.id),
                <span>
                  You are about to delete{" "}
                  <span className="font-semibold uppercase">
                    {activeView.label}
                  </span>{" "}
                  document on Inspectra.
                </span>
              );
              setActiveView(null);
            }}
          >
            {isDeletingDoc ? "Deleting" : "Delete"}
          </button>
        </div>
        <div className="h-[90vh]">
          {activeView.type === "application/pdf" ? (
            <iframe
              src={`${activeView.previewUrl}#toolbar=0&navpanes=0`}
              width="100%"
              height="100%"
              style={{
                border: "none",
                borderRadius: "8px",
                // pointerEvents: "none",
              }}
              title="PDF Preview"
              onContextMenu={(e) => e.preventDefault()}
            ></iframe>
          ) : (
            <div className="flex justify-center h-full">
              <div className="rounded-xl overflow-auto">
                <img
                  src={activeView.previewUrl}
                  alt="IMAGE Preview"
                  className="select-none"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
