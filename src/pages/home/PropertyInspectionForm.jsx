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

export default function PropertyInspectionForm() {
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

  function onSubmit({ clientName, clientEmail, message, scheduleDate }) {
    sendSchedule(
      {
        property: id,
        clientName,
        clientEmail,
        message,
        scheduleDate: moment(scheduleDate).format("LLL"),
      },
      {
        onSuccess: () => {
          reset();
          setValue("scheduleDate", formattedNow);
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
            icon={
              <HiOutlineFaceSmile className="text-xlg text-blue-500 cursor-default" />
            }
            {...register("clientName", { required: "Enter your full name" })}
          />
        </FormFieldHolder>
        <FormFieldHolder label="email" error={errors?.clientEmail?.message}>
          <FormInput
            id="email"
            type="email"
            placeholder="Enter email address"
            icon={
              <HiOutlineEnvelope className="text-xlg text-blue-500 cursor-default" />
            }
            {...register("clientEmail", {
              required: "Enter your email address",
            })}
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
        <div className="mt-20">
          <Button disabled={isSending}>
            {isSending ? (
              <LoaderSm />
            ) : (
              <>
                <span>Schedule</span>
                <HiOutlinePaperAirplane size={24} />
              </>
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
