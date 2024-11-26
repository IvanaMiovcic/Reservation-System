import { Loader2 } from "lucide-react";
export default function LoadingPage() {
  return (
    <div>
      <div className="flex w-[100%] h-screen justify-center items-center flex-grow">
        <Loader2 className="animate-spin text-white text-lg" />
      </div>
    </div>
  );
}
