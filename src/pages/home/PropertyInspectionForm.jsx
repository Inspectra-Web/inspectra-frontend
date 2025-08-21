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
import { useNavigate, useParams } from "react-router-dom";
import { useOnePropertyListing } from "../../hooks/useProperty";
import { LoaderLg, LoaderSm } from "../../static/Loaders";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { HiOutlineCalendar } from "react-icons/hi";
import { useSendInspectionSchedule } from "../../hooks/useSchedule";
import moment from "moment";
import { calculateCommissionedInspection } from "../../helpers/helpers";
import { useUser } from "../../hooks/useAuth";
import { IoCardOutline } from "react-icons/io5";

export default function PropertyInspectionForm() {
  const navigate = useNavigate();
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
  } = useForm({ defaultValues: { payNow: true } });

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setValue("scheduleDate", now);
  }, [setValue]);

  function onSubmit(data) {
    const payNow = data?.payNow === true || data.payNow === "true";
    sendSchedule(
      {
        property: id,
        message: data?.message,
        scheduleDate: moment(data?.scheduleDate).format("LLL"),
        payNow,
      },
      {
        onSuccess: () => {
          reset();
          navigate("/client/schedules");
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
        <FormFieldHolder
          label="Payment Preference"
          error={errors?.payNow?.message}
        >
          <FormInput
            isRadio
            id="pay-now"
            radioDefault="true"
            optionData={[
              { value: "true", label: "Pay Now" },
              { value: "false", label: "Pay Later" },
            ]}
            icon={
              <IoCardOutline className="text-xlg text-blue-500 cursor-default" />
            }
            {...register("payNow", {
              required: "Please select a payment option",
              setValueAs: (v) => v === "true",
            })}
          />
        </FormFieldHolder>
        <p className="text-yellow-500 text-[1.7rem] text-center">
          You pay{" "}
          <strong>
            ₦
            {calculateCommissionedInspection(
              property?.inspectionCost
            ).totalPay.toLocaleString()}
          </strong>
          <br />
          <em>+ 7.5% VAT</em>
        </p>

        <div className="mt-20 flex justify-center">
          <Button disabled={isSending}>
            {isSending ? (
              <LoaderSm />
            ) : (
              <>
                {watch("payNow") === "true"
                  ? "Pay Now & Schedule"
                  : "Schedule Without Payment"}
                <HiOutlinePaperAirplane size={24} />
              </>
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
