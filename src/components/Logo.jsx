import { Link } from "react-router-dom";
import logoImg from "../assets/inspectra-logo-primary-lg-svg.svg";

export default function Logo() {
  return (
    <Link to="/">
      <img src={logoImg} alt="Inspectra Primary Logo" className="h-20" />
    </Link>
  );
}
