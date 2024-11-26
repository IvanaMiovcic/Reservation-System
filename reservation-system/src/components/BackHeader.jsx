import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackHeader(props) {
  return (
    <div className="flex flex-row justify-between pt-10 sm:pt-6">
      <Link to={props.backLink}>
        <div className="flex flex-row justify-center items-center gap-2 py-1 font-poppins text-white text-xl">
          <Button
            variant="outline"
            className="dark flex flex-row space-x-4 text-white font-poppins text-xl "
          >
            <ArrowLeft />
            Back
          </Button>
        </div>
      </Link>
    </div>
  );
}
