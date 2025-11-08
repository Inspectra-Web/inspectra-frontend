export default function PropertyId({ propertyId, inspectionCost }) {
  return (
    <>
      {" "}
      <div className="mt-10 mb-5 font-semibold flex items-center smmobile:flex-col-reverse smmobile:items-start gap-5">
        <span className="text-slate-500 midmobile:hidden">Property ID:</span>{" "}
        {propertyId}
        <span className="text-slate-200 smmobile:hidden">|</span>
        <div>
          {inspectionCost === 0 ? (
            <strong className="text-sky-500 px-10 py-3 bg-sky-50 rounded-xl">
              FREE INSPECTION
            </strong>
          ) : (
            <span className="text-slate-500 italic">
              You charge{" "}
              <strong className="text-sky-500">
                ₦{inspectionCost.toLocaleString()}
              </strong>{" "}
              for Inspection
            </span>
          )}
        </div>
      </div>
    </>
  );
}
