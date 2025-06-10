import nodataImg from "../assets/no-data-found.svg";

export const NoMessage = ({ model, option = true }) => {
  return (
    <div className="text-center my-20 flex flex-col items-center">
      <img src={nodataImg} className="w-96" />
      <h2 className="heading-2 my-5 capitalize">No {model} Found</h2>
      <p className="text-slate-500">
        We couldn&apos;t find any {model} matching your criteria.{" "}
        {option && "Please try again later or adjust your search filters."}
      </p>
    </div>
  );
};
