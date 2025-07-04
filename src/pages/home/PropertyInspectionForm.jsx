import {
  HiOutlineEnvelope,
  HiOutlineFaceSmile,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import Button from "../../components/Button";
import ParticlesBg from "../../components/ParticlesBg";
import { Container } from "../../ui/Container";
import { Header } from "../../ui/Header";
import { Form } from "../../ui/Form";
import { FormFieldHolder } from "../../ui/FormFieldHolder";
import { FormInput } from "../../ui/FormInput";
import GoBackBtn from "../../components/GoBackBtn";
import { TbFileDescription } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { useOnePropertyListing } from "../../hooks/useProperty";
import { LoaderLg, LoaderSm } from "../../static/Loaders";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { HiOutlineCalendar } from "react-icons/hi";
import { useSendInspectionSchedule } from "../../hooks/useSchedule";
import moment from "moment";
import { calculateCommissionedInspection } from "../../helpers/helpers";
import { useUser } from "../../hooks/useAuth";

export default function PropertyInspectionForm() {
  const { user } = useUser();
  const { id } = useParams();
  const { isPending, property, realtor } = useOnePropertyListing(id);
  const { isSending, sendSchedule } = useSendInspectionSchedule();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm();

  const now = new Date();
  const formattedNow = now.toISOString().slice(0, 16);

  useEffect(() => {
    setValue("scheduleDate", formattedNow);
  }, [setValue, formattedNow]);

  function onSubmit({ message, scheduleDate }) {
    sendSchedule(
      {
        property: id,
        message,
        scheduleDate: moment(scheduleDate).format("LLL"),
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }
  if (!property || isPending) return <LoaderLg />;

  return (
    <Container>
      <ParticlesBg />
      <Header
        description="Sending Inspection Schedule to:"
        link={`/realtor-detail/${realtor?.profile}`}
        label={<span className="capitalize">{realtor?.fullname}</span>}
      />
      <GoBackBtn />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        heading="Schedule Inspection Form"
        description="Kindly fill the Schedule Information below."
      >
        <h2 className="heading-2 text-center">{property?.title}</h2>
        <p className="font-bold text-5xl text-white text-center">
          ({property?.propertyId})
        </p>

        <FormFieldHolder label="full name" error={errors?.clientName?.message}>
          <FormInput
            id="full-name"
            type="text"
            placeholder="Enter full name"
            defaultValue={user?.fullname.toUpperCase()}
            disabled
            icon={
              <HiOutlineFaceSmile className="text-xlg text-blue-500 cursor-default" />
            }
          />
        </FormFieldHolder>
        <FormFieldHolder label="email" error={errors?.clientEmail?.message}>
          <FormInput
            id="email"
            type="email"
            placeholder="Enter email address"
            defaultValue={user?.email}
            disabled
            icon={
              <HiOutlineEnvelope className="text-xlg text-blue-500 cursor-default" />
            }
          />
        </FormFieldHolder>
        <FormFieldHolder
          label="Schedule Date"
          error={errors?.scheduleDate?.message}
        >
          <FormInput
            type="datetime-local"
            id="schedule-date"
            value={watch("scheduleDate")}
            icon={
              <HiOutlineCalendar className="text-xlg text-blue-500 cursor-default" />
            }
            {...register("scheduleDate", {
              required: "Schedule your inspection date",
            })}
          />
        </FormFieldHolder>
        <FormFieldHolder
          label="Additional Message"
          error={errors?.message?.message}
        >
          <FormInput
            textarea={true}
            id="message"
            placeholder="Leave a short message"
            icon={
              <TbFileDescription className="text-xlg text-blue-500 cursor-default" />
            }
            {...register("message", { required: "Enter your inquiry message" })}
          />
        </FormFieldHolder>
        {/* <p className="text-yellow-500 text-center">
          You pay{" "}
          <strong>
            ₦
            {calculateCommissionedInspection(
              property?.inspectionCost
            ).totalPay.toLocaleString()}
          </strong>
          .{" "}
          <strong>
            ₦
            {calculateCommissionedInspection(
              property?.inspectionCost
            ).inspectionFee.toLocaleString()}
          </strong>{" "}
          goes to the Realtor.{" "}
          <strong>
            ₦
            {calculateCommissionedInspection(
              property?.inspectionCost
            ).platformCommission.toLocaleString()}
          </strong>{" "}
          is our platform fee.
        </p> */}
        <div className="mt-20 flex justify-center">
          <Button disabled={isSending}>
            {isSending ? (
              <LoaderSm />
            ) : (
              <>
                <span>
                  Schedule{" "}
                  <strong>
                    ₦
                    {calculateCommissionedInspection(
                      property.inspectionCost
                    ).totalPay.toLocaleString()}
                  </strong>
                </span>
                <HiOutlinePaperAirplane size={24} />
              </>
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
