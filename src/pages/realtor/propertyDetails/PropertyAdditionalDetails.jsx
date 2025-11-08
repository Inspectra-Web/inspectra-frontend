import moment from "moment";
import ListDetails from "../../../components/ListDetails";
import { Link } from "react-router-dom";
import { HiMiniLink } from "react-icons/hi2";

export default function PropertyAdditionalDetails({
  realtor,
  createdAt,
  updatedAt,
  country,
  city,
  state,
  type,
  category,
}) {
  return (
    <>
      {" "}
      <h3 className="heading-2 text-5xl mt-20 mb-3">Additional Details</h3>
      <ul className="list mb-16">
        <ListDetails
          title="Realtor"
          details={
            <Link
              to={`/app/profile/${realtor.profile}`}
              className="flex gap-3 hover:text-blue-500 transition-all ease-linear"
            >
              {realtor.fullname}
              <HiMiniLink size={16} />
            </Link>
          }
        />
        <ListDetails
          title="Date Added"
          details={moment(createdAt).format("LLL")}
        />
        <ListDetails
          title="Date Updated"
          details={moment(updatedAt).format("LLL")}
        />
        <ListDetails title="City / LGA" details={city} />
        <ListDetails title="State" details={state} />
        <ListDetails title="Country" details={country} />
        <ListDetails title="Type" details={type} />
        <ListDetails title="Category" details={category} />
      </ul>
    </>
  );
}
