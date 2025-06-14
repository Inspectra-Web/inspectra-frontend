import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";
// import { FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="text-white bg-sky-950 py-40">
      <div className="w-[135rem] mindesktop:w-[95%] mx-auto smmobile:text-center">
        <div className="flex items-center justify-between sm:flex-col gap-5">
          <Logo />
          <span className="text-slate-400 text-[14px]">
            &copy; 2025. All rights reserved
          </span>
        </div>
        <div className="grid grid-cols-4 bigmobile:grid-cols-3 smmobile:grid-cols-1 gap-36 mt-20">
          <div className="flex flex-col gap-5 midtablet:col-span-2 smmobile:col-span-1">
            <p>
              Inspectra is the smarter way to explore real estate in Nigeria.
              From verified listings and realtor chat to inspection scheduling
              and agency tools.
            </p>
            <p>
              We’re reimagining how properties are found, viewed, and trusted.
            </p>
          </div>
          <nav>
            <ul className="flex flex-col gap-10">
              <li>
                <Link
                  to="/listings"
                  className="hover:text-blue-500 transition-all ease-linear"
                >
                  Listings
                </Link>
              </li>

              <li>
                <Link
                  to="/top-listings"
                  className="hover:text-blue-500 transition-all ease-linear"
                >
                  Top Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/pricings"
                  className="hover:text-blue-500 transition-all ease-linear"
                >
                  Pricings
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-blue-500 transition-all ease-linear"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-blue-500 transition-all ease-linear"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul className="flex flex-col gap-10">
              <li>
                <Link
                  to="/sign-up"
                  className="hover:text-blue-500 transition-all ease-linear"
                >
                  Sign up
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-in"
                  className="hover:text-blue-500 transition-all ease-linear"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  to="/app/add-property"
                  className="hover:text-blue-500 transition-all ease-linear"
                >
                  Add a listing
                </Link>
              </li>
              <li>
                <Link
                  to="/app"
                  className="hover:text-blue-500 transition-all ease-linear"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-10 bigmobile:col-span-2 smmobile:col-span-1 smmobile:items-center">
            {/* <Link
              to="#"
              className="flex items-center gap-3 hover:text-blue-500 transition-all ease-linear"
            >
              <HiOutlinePhone size={24} className="text-blue-500" />{" "}
              <span>234-916-581-2629</span>
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 hover:text-blue-500 transition-all ease-linear"
            >
              <FaWhatsapp size={24} className="text-blue-500" />{" "}
              <span>234-916-581-2629</span>
            </Link> */}
            <Link
              to="mailto:support@inspectraweb.com"
              className="flex items-center gap-3 hover:text-blue-500 transition-all ease-linear"
            >
              <HiOutlineEnvelopeOpen size={24} className="text-blue-500" />{" "}
              <span>support@inspectraweb.com</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
