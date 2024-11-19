import Logo from "./Logo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  //function to determine if a user is logged in and currently has a valid sesssion
  const isLoggedIn = () => {
    //logic to determine if user has a valid session goes here
    return false;
  };

  return (
    <div className="flex flex-row justify-between pt-10 sm:pt-6">
      <div className="flex flex-row justify-center items-center gap-2 font-poppins text-white text-xl">
        <Logo />
        <div>SmartQ</div>
      </div>
      <div className="font-poppins">
        <Link>
          <Button variant="secondary">
            {isLoggedIn() ? "Dashboard" : "Log In"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
