import AltHeader from "./AltHeader";
import FormScaffold from "./FormScaffold";
import Footer from "./Footer";

export default function Container() {
  return (
    <div className="bg-black flex flex-col items-center w-screen">
      <div className="h-screen w-9/12 flex flex-col">
        <AltHeader />
        <div className="flex flex-row flex-grow justify-center">
          <div className="flex flex-row justify-center items-center">
            <div className="w-11/12">
              <FormScaffold />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
