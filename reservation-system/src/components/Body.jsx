import { Link } from "react-router-dom";

export default function Body() {
  return (
    <div className="flex flex-col items-center font-poppins gap-20">
      <div className="h-5/6 w-9/12 flex flex-col gap-4 items-center text-white">
        <div className="flex flex-row gap-6 text-center text-4xl sm:text-5xl">
          <div>Queue</div>
          <div> Smart</div>
        </div>
        <div className="text-3xl sm:text-4xl">with</div>
        <div className="text-4xl sm:text-5xl">SmartQ</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
        <Link to={"/create-account"}>
          <button className="transition-colors duration-400 w-60 text-sm lg:w-80 sm:text-base border bg-white rounded h-10 hover:text-white hover:bg-black hover:ease-in-out">
            Create Account
          </button>
        </Link>
        <Link to={"/log-in"}>
          <button className="transition-colors duration-400 w-60 text-sm lg:w-80 sm:text-base border text-white rounded h-10 hover:text-black hover:bg-white hover:ease-in-out">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
}
