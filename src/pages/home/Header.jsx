import { useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { HiMenuAlt1 } from "react-icons/hi";
import Logo from "../../components/Logo";
import { NavLink } from "react-router-dom";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import Button from "../../components/Button";
import { useUser } from "../../hooks/useAuth";

function NavList({ className, onShow }) {
  return (
    <ul className={className}>
      <li>
        {/* <NavLink
          to="/realtors"
          className={({ isActive }) =>
            `hover:bg-blue-50 transition-all ease-linear hover:text-blue-500 py-5 px-14 rounded-full
          ${isActive ? "text-blue-500 bg-blue-50" : ""}
         `
          }
        >
          Realtors
        </NavLink> */}
      </li>
      <li>
        <NavLink
          onClick={() => onShow(false)}
          to="/listings"
          className={({ isActive }) =>
            `hover:bg-blue-50 transition-all ease-linear hover:text-blue-500 py-5 px-8 rounded-full
          
          ${isActive ? "bg-blue-50 text-blue-500" : ""}`
          }
        >
          Listings
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => onShow(false)}
          to="/top-listings"
          className={({ isActive }) =>
            `hover:bg-blue-50 transition-all ease-linear hover:text-blue-500 py-5 px-14 rounded-full
          
          ${isActive ? "bg-blue-50 text-blue-500" : ""}`
          }
        >
          Top Listings
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={() => onShow(false)}
          to="/pricings"
          className={({ isActive }) =>
            `hover:bg-blue-50 transition-all ease-linear hover:text-blue-500 py-5 px-14 rounded-full
          
          ${isActive ? "bg-blue-50 text-blue-500" : ""}`
          }
        >
          Pricings
        </NavLink>
      </li>
    </ul>
  );
}

function MobileNav({ user, show, setShow }) {
  const handleToggleSidebar = () => setShow((prev) => !prev);
  const sidebarRef = useClickOutside(() => handleToggleSidebar(false), show);

  return (
    <>
      <div
        className={`hidden ${
          show ? "translate-x-0" : "-translate-x-full"
        } w-full bg-black opacity-50 absolute top-0 left-0 h-full smtablet:block z-[1000]`}
      ></div>
      <nav
        ref={sidebarRef}
        className={`hidden ${
          show ? "translate-x-0" : "-translate-x-full"
        } absolute top-0 left-0 w-[27rem] h-screen bg-slate-900 border-r border-slate-800 smtablet:flex flex-col pt-[5rem] transition-all ease-linear z-[1001]`}
      >
        <NavList
          className="flex items-center flex-col gap-20 capitalize"
          onShow={handleToggleSidebar}
        />
        <br />
        <br />
        {user ? (
          <div className="flex justify-center">
            <Button
              link={user.role === "client" ? "/client/dashboard" : "/app"}
              variation="link"
            >
              <span>View Dashboard</span>
              <HiOutlinePaperAirplane size={24} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <Button link="/sign-up" variation="link">
              <span>Sign up</span>
              <HiOutlinePaperAirplane size={24} />
            </Button>
            <Button link="/sign-in" variation="bordered">
              <span className="text-blue-500">Sign in</span>
              <HiOutlinePaperAirplane size={24} className="text-blue-500" />
            </Button>
          </div>
        )}
      </nav>
    </>
  );
}

export default function Header() {
  const [show, setShow] = useState(false);
  const { user } = useUser();

  return (
    <header className="px-32 midtablet:px-10 flex items-center justify-between font-medium py-5 gap-7">
      <MobileNav user={user} show={show} setShow={setShow} />
      <div className="flex items-center gap-16">
        <div className="flex items-center gap-14">
          <Logo />
          <HiMenuAlt1
            onClick={() => setShow(!show)}
            size={28}
            className="hidden midmobile:none cursor-pointer"
          />
        </div>
        <nav className="smtablet:hidden">
          <NavList
            className="flex items-center gap-5 capitalize"
            onShow={setShow}
          />
        </nav>
      </div>
      <div className="flex items-center gap-10 midmobile:flex-col-reverse">
        {/* <Link
          to="#"
          className="flex items-center gap-3 hover:text-blue-500 transition-all ease-linear"
        >
          <HiOutlinePhone size={24} className="text-blue-500" />
          <span>234-916-581-2629</span>
        </Link> */}
        <div className="smtablet:hidden">
          {user ? (
            <Button
              link={user.role === "client" ? "/client/dashboard" : "/app"}
              variation="link"
            >
              <span>View Dashboard</span>
              <HiOutlinePaperAirplane size={24} />
            </Button>
          ) : (
            <div className="flex gap-5">
              <Button link="/sign-up" variation="link">
                <span>Sign up</span>
                <HiOutlinePaperAirplane size={24} />
              </Button>
              <Button link="/sign-in" variation="bordered">
                <span className="text-blue-500">Sign in</span>
                <HiOutlinePaperAirplane size={24} className="text-blue-500" />
              </Button>
            </div>
          )}
        </div>
        <HiMenuAlt1
          onClick={() => setShow(!show)}
          size={28}
          className="hidden smtablet:block cursor-pointer"
        />
      </div>
    </header>
  );
}
