import { HiFingerPrint, HiOutlineViewfinderCircle } from "react-icons/hi2";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoMailOpenOutline } from "react-icons/io5";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function RealtorsScreen() {
  return (
    <div className="mx-auto max-w-[135rem] mindesktop:w-[95%]">
      <h2 className="heading-2">Realtors</h2>
      <div className="grid grid-cols-2 gap-16 mt-14 midtablet:grid-cols-1">
        <RealtorCard
          src="https://ultra-realhomes.b-cdn.net/wp-content/uploads/2020/05/Nathan-James-300x300.jpg"
          names="Ikoku A. Ozoiemena"
          agency="Ultimate Real Estates"
          listings={20}
          fb={true}
          ins={false}
          linked={true}
          whatsapp={true}
          mail={false}
          x={true}
        />
        <RealtorCard
          src="https://ultra-realhomes.b-cdn.net/wp-content/uploads/2020/05/Nathan-James-300x300.jpg"
          names="Benard V. Sanari"
          agency="Universo International"
          listings={20}
          fb={true}
          ins={true}
          linked={true}
          whatsapp={true}
          mail={true}
          x={true}
        />
        <RealtorCard
          src="https://ultra-realhomes.b-cdn.net/wp-content/uploads/2020/05/Nathan-James-300x300.jpg"
          names="Ebuka C. Chinedu"
          agency="Agent Association"
          listings={20}
          fb={false}
          ins={false}
          linked={false}
          whatsapp={true}
          mail={true}
          x={false}
        />
        <RealtorCard
          src="https://ultra-realhomes.b-cdn.net/wp-content/uploads/2020/05/John-David.jpg"
          names="Fredrick O. Reuben"
          agency="Fraco Agency"
          listings={20}
          fb={true}
          ins={false}
          linked={false}
          whatsapp={true}
          mail={true}
          x={true}
        />
        <RealtorCard
          src="https://ultra-realhomes.b-cdn.net/wp-content/uploads/2020/05/Alice-Brian-1-300x300.jpg"
          names="Pastore K. Ikemjika"
          agency="Pastore Realtors Agency"
          listings={20}
          fb={false}
          ins={true}
          linked={true}
          whatsapp={true}
          mail={true}
          x={false}
        />
        <RealtorCard
          src="https://ultra-realhomes.b-cdn.net/wp-content/uploads/2020/05/Melissa-William-300x300.jpg"
          names="Okoro C. Franklin"
          agency="Universo International"
          listings={20}
          fb={true}
          ins={false}
          linked={true}
          whatsapp={false}
          mail={true}
          x={false}
        />
      </div>
      <div className="flex items-center gap-10 place-content-center mb-10 mt-20 text-slate-500">
        <button className="w-16 h-16 rounded-md flex  items-center justify-center bg-gradient-to-tr from-blue-400 to-blue-600 text-white focus:ring-blue-500 focus:ring-2 ring-offset-1 transition-all duration-300">
          <HiOutlineChevronLeft size={24} />
        </button>
        <button
          className={`text-2xl w-14 h-14 
                bg-sky-500 text-white rounded-md`}
        >
          1
        </button>
        <button
          className={`text-2xl w-14 h-14 
                bg-slate-300 text-white rounded-md`}
        >
          2
        </button>
        <button
          className={`text-2xl w-14 h-14 
                bg-slate-300 text-white rounded-md`}
        >
          3
        </button>

        <button className="w-16 h-16 rounded-md flex  items-center justify-center bg-gradient-to-tr from-blue-400 to-blue-600 text-white focus:ring-blue-500 focus:ring-2 ring-offset-1 transition-all duration-300">
          <HiOutlineChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

function RealtorCard({
  src,
  names,
  agency,
  fb,
  ins,
  linked,
  whatsapp,
  mail,
  x,
}) {
  return (
    <div className="flex items-start gap-10 bg-white shadow-shadowcustom rounded-3xl p-10 midmobile:flex-col midmobile:items-center">
      <img src={src} alt={names} className="w-60 rounded-full" />
      <div className="flex-1 midmobile:flex flex-col items-center">
        <h2 className="font-semibold text-slate-800 text-4xl flex items-center gap-2 mb-1">
          <Link
            to="#"
            className="hover:text-blue-500 transition-all ease-linear"
          >
            {names}
          </Link>{" "}
          <HiFingerPrint className="text-blue-500" />
        </h2>
        <p className="border-b pb-5">
          Company Realtor at{" "}
          <span className="text-slate-800 font-semibold">{agency}</span>
        </p>
        <div className="flex gap-7 mt-7 mb-5">
          {fb && (
            <Link to="#" target="_blank">
              <FaFacebookF className="p-5 bg-blue-100 text-blue-500 text-7xl rounded-xl transition-all duration-300 hover:bg-blue-500 hover:text-blue-50 cursor-pointer" />
            </Link>
          )}
          {ins && (
            <Link to="#" target="_blank">
              <FaInstagram className="p-5 bg-red-100 text-red-500 text-7xl rounded-xl transition-all duration-300 hover:bg-red-500 hover:text-red-50 cursor-pointer" />
            </Link>
          )}
          {x && (
            <Link to="#" target="_blank">
              <FaXTwitter className="p-5 bg-stone-100 text-stone-500 text-7xl rounded-xl transition-all duration-300 hover:bg-stone-500 hover:text-stone-50 cursor-pointer" />
            </Link>
          )}

          {whatsapp && (
            <Link
              to={`https://wa.me/09165812629?text=Hello,%20I%20want%20to%20learn%20more%20about%20your%20services.`}
              target="_blank"
            >
              <FaWhatsapp className="p-5 bg-green-100 text-green-500 text-7xl rounded-xl transition-all duration-300 hover:bg-green-500 hover:text-green-50 cursor-pointer" />
            </Link>
          )}

          {mail && (
            <Link
              to={`mailto:cfoonyemmemme@gmail.com?subject=Inquiry&body=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`}
              target="_blank"
            >
              <IoMailOpenOutline className="p-5 bg-orange-100 text-orange-500 text-7xl rounded-xl transition-all duration-300 hover:bg-orange-500 hover:text-orange-50 cursor-pointer" />
            </Link>
          )}
          {linked && (
            <Link target="_blank" to="#">
              <FaLinkedinIn className="p-5 bg-sky-100 text-sky-500 text-7xl rounded-xl transition-all duration-300 hover:bg-sky-500 hover:text-sky-50 cursor-pointer" />
            </Link>
          )}
        </div>
        <div className="flex items-center gap-4">
          <HiOutlineViewfinderCircle className="text-blue-500" size={24} />
          <span className="text-[14px]">
            25, Akpiri Street, Olodi Apapa, Lagos, Nigeria.
          </span>
        </div>
      </div>
    </div>
  );
}
