import Logo from "./Logo";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex flex-row justify-between pt-10 sm:pt-6">
      <Link to={"/"}>
        <div className="flex flex-row justify-center items-center gap-2 py-1 font-poppins text-white text-xl">
          <Logo />
          <div>SmartQ</div>
        </div>
      </Link>
    </div>
  );
}
