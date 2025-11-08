import { useState } from "react";
import { GoVerified } from "react-icons/go";
import { HiOutlineFolderOpen } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RxCounterClockwiseClock } from "react-icons/rx";
import LegalDocumentPreview from "./LegalDocumentPreview";

export default function PropertyLegalDocs({
  existingDocs,
  isDeletingDoc,
  deleteDoc,
}) {
  const [activeView, setActiveView] = useState(null);
  return (
    <>
      <h3 className="heading-2 text-5xl mt-20 mb-8">Legal Documents</h3>
      <div className="grid grid-cols-2 gap-10 mb-20 midmobile:grid-cols-1">
        {existingDocs.map((doc, index) => (
          <div key={index}>
            <div className="flex items-center gap-5 p-10 bigmobile:p-5 bg-sky-50 hover:bg-white border-2 border-transparent hover:border-sky-200 transition-all duration-500 rounded-2xl cursor-default">
              {doc.type?.includes("image") ? (
                <img
                  src={doc.previewUrl}
                  alt={doc.label}
                  className="w-[8rem] h-[8rem]  object-cover rounded-xl"
                />
              ) : doc.type === "application/pdf" ? (
                <IoDocumentTextOutline className="text-[8rem] block text-blue-500" />
              ) : null}
              <div className="flex-1 min-w-0">
                <p className="truncate block text-slate-800 text-[2rem] smmobile:text-[1.8rem] font-medium">
                  {doc.label}
                </p>
                <p className="flex items-center gap-4 text-[1.4rem] tracking-wider">
                  {doc.verified ? (
                    <span className="text-green-500">
                      <GoVerified size={25} className="inline" /> VERIFIED
                    </span>
                  ) : (
                    <span className="text-yellow-500">
                      <RxCounterClockwiseClock size={25} className="inline" />{" "}
                      UNDER-REVIEW
                    </span>
                  )}
                </p>
              </div>
              <button
                to={doc.previewUrl}
                onClick={() => setActiveView(doc)}
                type="button"
                className="text-6xl midmobile:text-5xl text-sky-600"
                title={`See Document: ${doc.label}`}
              >
                <HiOutlineFolderOpen />
              </button>
            </div>
            {activeView && (
              <LegalDocumentPreview
                index={index}
                activeView={activeView}
                setActiveView={setActiveView}
                isDeletingDoc={isDeletingDoc}
                deleteDoc={deleteDoc}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
