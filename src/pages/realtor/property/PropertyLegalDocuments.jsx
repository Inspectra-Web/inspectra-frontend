import { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { legalDocumentOptions } from "../../../helpers/helpers";
import { formatFileSize } from "../../../helpers/FileReader";
import { Link } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import { RxCounterClockwiseClock } from "react-icons/rx";
import LegalDocumentPreview from "../propertyDetails/LegalDocumentPreview";

const MAX_FILE_SIZE = 500 * 1024; // 500 KB
const MAX_DOCUMENTS = 5;

export default function PropertyLegalDocuments({
  register,
  setValue,
  watch,
  errors,
  setError,
  clearErrors,
  property,
  isDeletingDoc,
  deleteDoc,
}) {
  const [activeView, setActiveView] = useState(null);
  const legalDocuments = watch("legalDocuments") ?? [];
  const existingDocs = property?.legalDocuments.map((doc) => ({
    id: doc._id,
    label: doc.name || "",
    file: null,
    previewUrl: doc.fileUrl,
    type: doc.fileUrl?.toLowerCase().includes(".pdf")
      ? "application/pdf"
      : "image/*",
    verified: doc.verified,
    size: doc.size,
  }));

  useEffect(() => {
    return () => {
      (legalDocuments || []).forEach((d) => {
        if (d?.previewUrl?.startsWith("blob:"))
          URL.revokeObjectURL(d.previewUrl);
      });
    };
  });

  const handleAddDocuments = () => {
    if (legalDocuments?.length >= MAX_DOCUMENTS) {
      setError("legalDocuments", {
        type: "manual",
        message: "You can only upload 5 documents.",
      });
      return;
    }
    clearErrors("legalDocuments");
    setValue("legalDocuments", [...legalDocuments, { label: "", file: null }]);
  };

  const handleLabelChange = (index, value) => {
    const updated = legalDocuments.map((d, i) =>
      i === index ? { ...d, label: value } : d
    );
    setValue("legalDocuments", updated);
  };

  const handleFileUpload = (index, file) => {
    if (!file) return;

    if (file.size >= MAX_FILE_SIZE) {
      setError("legalDocuments", {
        type: "manual",
        message:
          "File size exceeds the 500KB limit. Please upload a smaller file.",
      });
      return;
    }

    clearErrors("legalDocuments");

    const prev = legalDocuments?.[index];
    if (prev?.previewUrl) URL.revokeObjectURL(prev.previewUrl);

    const previewUrl = URL.createObjectURL(file);
    const updated = legalDocuments.map((d, i) =>
      i === index ? { ...d, file, previewUrl, type: file.type } : d
    );

    setValue("legalDocuments", updated);
  };

  const handleRemoveDocument = (index) => {
    const updated = legalDocuments.filter((_, i) => i !== index);
    setValue("legalDocuments", updated);
    if (updated.length < MAX_DOCUMENTS) clearErrors("legalDocuments");
  };

  return (
    <>
      {" "}
      <h2 className="mt-20 heading-2">Legal Documents</h2>
      <p className="text-slate-500">
        Upload ownership or legal documents for this property (PDF, JPG, PNG).
      </p>
      {existingDocs?.length > 0 && (
        <div className="grid grid-cols-3 bigtablet:grid-cols-2 midmobile:grid-cols-1 smmobile:grid-cols-1 gap-10 my-10">
          {existingDocs?.map((doc, index) => (
            <div key={index}>
              <div className="flex gap-3 items-center">
                {doc.type?.includes("image") ? (
                  <img
                    src={doc.previewUrl}
                    alt={doc.label}
                    className="w-[5rem] h-[5rem] object-cover rounded-xl"
                  />
                ) : doc.type === "application/pdf" ? (
                  <IoDocumentTextOutline className="text-[5rem] text-blue-500" />
                ) : null}
                <div className="flex-1 min-w-0">
                  <p className="truncate block text-slate-800 font-medium">
                    {doc.label}
                  </p>
                  <div
                    onClick={() => setActiveView(doc)}
                    className="italic text-[1.4rem] cursor-pointer inline"
                  >
                    {doc.type === "application/pdf"
                      ? "View Docs (PDF)"
                      : "View Docs (IMAGE)"}
                  </div>
                </div>
                {doc.verified ? (
                  <GoVerified size={16} className="inline text-green-500" />
                ) : (
                  <RxCounterClockwiseClock
                    size={16}
                    className="inline text-yellow-500"
                  />
                )}
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
      )}
      <div
        className={`${
          legalDocuments?.length > 0 ? "mt-10" : ""
        } gap-3 flex flex-col items-start`}
      >
        {legalDocuments?.map((doc, index) => {
          return (
            <div key={index} className="w-full">
              <div
                className={`grid ${
                  doc.previewUrl ? "grid-cols-2" : "grid-cols-1"
                } gap-3 midmobile:grid-cols-1`}
              >
                <div className="border-2 focus-within:ring-blue-500 rounded-full overflow-hidden flex items-center justify-between">
                  <select
                    value={doc.label}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                    className="italic h-20 px-10 text-slate-800 focus:outline-none w-[85%]"
                  >
                    <option value="" disabled>
                      Select Document Type
                    </option>
                    {legalDocumentOptions.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor={`legal-doc-${index}`}
                    className="flex focus:ring-4 ring-offset-2 items-center gap-3 h-full px-10 rounded-full text-white bg-gradient-to-tr from-blue-500 to-blue-700 bg-[length:200%] bg-left hover:bg-right transition-all duration-500 ease cursor-pointer"
                  >
                    <span className="smmobile:hidden">Upload</span>
                    <IoDocumentTextOutline className="text-4xl" />{" "}
                  </label>
                  <input
                    id={`legal-doc-${index}`}
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => handleFileUpload(index, e.target.files[0])}
                  />
                </div>

                {doc.previewUrl && (
                  <div className="flex flex-1 gap-3 items-center mb-5">
                    {doc.type?.includes("image") ? (
                      <img
                        src={doc.previewUrl}
                        alt={doc.label}
                        className="w-[3rem] h-[3rem] object-cover rounded-xl"
                      />
                    ) : doc.type === "application/pdf" ? (
                      <IoDocumentTextOutline className="text-[3rem] text-blue-500" />
                    ) : null}
                    <div className="flex-1 min-w-0">
                      <p className="truncate block text-slate-800 font-medium">
                        <Link
                          to={doc.previewUrl}
                          target="_blank"
                          className="italic"
                        >
                          {doc.file?.name
                            ? doc.file.name
                            : doc.type === "application/pdf"
                            ? "View Docs (PDF)"
                            : "View Docs (IMAGE)"}
                        </Link>
                      </p>
                      {doc.file?.size && (
                        <p className="text-slate-500 text-[1.2rem]">
                          {formatFileSize(doc.file?.size)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveDocument(index)}
                      type="button"
                      className="text-5xl text-rose-600 leading-none"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {errors.legalDocuments && (
          <p className="text-red-500 mt-2">{errors.legalDocuments.message}</p>
        )}
        <button
          type="button"
          className={`text-blue-600 font-medium inline mt-5`}
          onClick={handleAddDocuments}
          // disabled={legalDocuments.length >= MAX_DOCUMENTS}
        >
          + Add {legalDocuments?.length > 0 ? "another" : ""} document
        </button>

        <input type="hidden" {...register("legalDocuments")} />
      </div>
    </>
  );
}
