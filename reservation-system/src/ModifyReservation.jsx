import BackHeader from "./components/BackHeader";
import Footer from "./components/Footer";
import ModRFormScaffold from "./components/ModRFormScaffold";

export default function ModifyReservation() {
  return (
    <div className="bg-black flex flex-col items-center w-screen">
      <div className="h-screen w-9/12 flex flex-col pt-4">
        <BackHeader backLink="/customer-home" />
        <div className="flex flex-row flex-grow justify-center">
          <div className="flex flex-row justify-center items-center">
            <div className="w-11/12">
              <ModRFormScaffold />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
