import { CiStickyNote } from "react-icons/ci";
import {
  HiOutlinePaperAirplane,
  HiOutlineRectangleStack,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { SlCloudUpload } from "react-icons/sl";
import Button from "../../components/Button";
import Form from "../../components/Form";

export default function Help() {
  return (
    <Form width="max-w-[60rem]">
      <h3 className="text-slate-500 uppercase font-semibold text-lg mb-10">
        Support Ticket Submission.
      </h3>
      <div className="my-10">
        <label
          htmlFor=""
          className="text-slate-500 italic font-semibold mb-5 inline-block"
        >
          <span>Subject</span> <span className="text-blue-500">*</span>
        </label>
        <div className="bg-gradient-to-tr from-slate-50 to-slate-100 h-20 rounded-full flex items-center gap-3 px-6 py-2 transition-all duration-300 focus-within:ring-2 ring-offset-2 border-2 focus-within:ring-blue-500 ring-2">
          <CiStickyNote className="text-xlg text-blue-500 cursor-pointer" />

          <input
            type="text"
            className="bg-transparent h-full flex-1 outline-none text-slate-500 italic"
            placeholder="Briefly describe your issue"
          />
        </div>
      </div>
      <div className="my-10">
        <label
          htmlFor=""
          className="text-slate-500 italic font-semibold mb-5 inline-block"
        >
          <span>Description</span> <span className="text-blue-500">*</span>
        </label>
        <div className="bg-gradient-to-tr from-slate-50 to-slate-100 h-40 rounded-full flex items-center px-6 py-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 ring-offset-2 border-2 ring-2">
          <HiOutlineSquares2X2 className="text-xlg text-blue-500 cursor-pointer" />

          <textarea
            type="text"
            className="bg-transparent h-full flex-1 outline-none text-slate-600 resize-none p-5 italic"
            placeholder="Explain the problem or request in detail"
          />
        </div>
      </div>
      <div className="my-10">
        <label
          htmlFor=""
          className="text-slate-500 italic font-semibold mb-5 inline-block"
        >
          <span>Issue Type</span> <span className="text-blue-500">*</span>
        </label>
        <div className="bg-gradient-to-tr from-slate-50 to-slate-100 h-20 rounded-full flex items-center px-6 py-2 gap-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 ring-2 ring-offset-2 border-2">
          <HiOutlineRectangleStack className="text-xlg text-blue-500 cursor-pointer" />

          <select
            type="text"
            className="bg-transparent cursor-pointer h-full flex-1 outline-none text-slate-400 italic"
          >
            <option value="">Select a Category</option>
            <option value="">Account Support</option>
            <option value="">Technical Issue</option>
            <option value="">Property Listing Issues</option>
            <option value="">Approval / Rejection Queries</option>
            <option value="">Communication Issues</option>
            <option value="">Feature Request</option>
            <option value="">Disputes and Complaints</option>
            <option value="">Other</option>
          </select>
        </div>
      </div>
      <div className="my-10">
        <label
          htmlFor=""
          className="text-slate-500 italic font-semibold mb-5 inline-block"
        >
          <span>Attachments</span> <span className="text-blue-500">*</span>
        </label>
        <div className="bg-gradient-to-tr from-slate-50 to-slate-100 h-20 rounded-full flex items-center px-6 py-2 gap-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 ring-2 ring-offset-2 border-2">
          <SlCloudUpload className="text-xlg text-blue-500 cursor-pointer" />

          <input type="file" id="upload" className="hidden"></input>
          <label
            htmlFor="upload"
            className="bg-transparent cursor-pointer h-full flex-1 outline-none flex items-center text-slate-400 italic"
          >
            Attach files (e.g: screenshots)
          </label>
        </div>
      </div>
      <Button link="/add-property">
        <span>Submit Request</span>
        <HiOutlinePaperAirplane size={24} />
      </Button>
    </Form>
  );
}
