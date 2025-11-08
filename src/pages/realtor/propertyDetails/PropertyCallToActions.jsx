import {
  HiOutlinePaperAirplane,
  HiOutlineTrash,
  HiXMark,
} from "react-icons/hi2";
import { HandleConfirmation } from "../../../ui/ConfirmationPrompt";
import Button from "../../../components/Button";
import { LoaderSm } from "../../../static/Loaders";

export default function PropertyCallToActions({
  user,
  setReason,
  reason,
  reviewStatus,
  isLoading,
  isDeleting,
  updateReviewStatus,
  _id,
  deleteListing,
  title,
}) {
  return (
    <>
      {user?.role === "admin" && (
        <>
          <label
            htmlFor="rejection-reason"
            className="text-slate-500 text-3xl inline-block mb-3 font-semibold"
          >
            Rejection Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            id="rejection-reason"
            className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-3xl h-40 w-full px-10 py-5 placeholder:text-slate-500 text-slate-500 resize-none"
            placeholder="Are you rejecting this listing?"
          ></textarea>

          <div className="flex flex-wrap gap-5 mt-10">
            {reviewStatus !== "approved" && !reason && (
              <Button
                disabled={isLoading}
                onClick={() =>
                  HandleConfirmation(
                    () =>
                      updateReviewStatus({
                        id: _id,
                        data: { reviewStatus: "approved" },
                      }),
                    <p>
                      You are about to publish{" "}
                      <span className="font-semibold uppercase">{title}</span>{" "}
                      listing on Inspectra.
                    </p>
                  )
                }
              >
                {isLoading ? (
                  <LoaderSm />
                ) : (
                  <>
                    <span>Publish</span>
                    <HiOutlinePaperAirplane size={24} />
                  </>
                )}
              </Button>
            )}
            <Button
              onClick={() =>
                HandleConfirmation(
                  () =>
                    updateReviewStatus(
                      {
                        id: _id,
                        data: {
                          reviewStatus: "rejected",
                          rejectionReason: reason,
                        },
                      },
                      { onSuccess: () => setReason("") }
                    ),
                  <p>
                    You are about to reject{" "}
                    <span className="font-semibold uppercase">{title}</span>{" "}
                    listing on Inspectra.
                  </p>
                )
              }
              disabled={!reason && isLoading}
              color="from-rose-500 to-rose-700 ring-rose-300"
            >
              {isLoading ? (
                <LoaderSm />
              ) : (
                <>
                  <span>Reject</span>
                  <HiXMark size={24} />
                </>
              )}
            </Button>
            {!reason && (
              <Button
                disabled={isDeleting}
                onClick={() =>
                  HandleConfirmation(
                    () => deleteListing(),
                    <p>
                      You are about to delete{" "}
                      <span className="font-semibold uppercase">{title}</span>{" "}
                      listing on Inspectra. Actions may not be reversed.
                    </p>
                  )
                }
                variation="delete"
              >
                {isDeleting ? (
                  <LoaderSm />
                ) : (
                  <>
                    <HiOutlineTrash size={24} />
                    <span>Unlist Property</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </>
      )}
      {user?.role === "realtor" && (
        <Button
          disabled={isDeleting}
          onClick={() =>
            HandleConfirmation(
              () => deleteListing(),
              "You are about to delete a listing. Actions may not be reversed."
            )
          }
          variation="delete"
        >
          {isDeleting ? (
            <LoaderSm />
          ) : (
            <>
              <HiOutlineTrash size={24} />
              <span>Unlist Property</span>
            </>
          )}
        </Button>
      )}
    </>
  );
}
