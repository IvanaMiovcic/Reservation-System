import AltHeader from "./AltHeader";
import FormScaffold from "./FormScaffold";
import Footer from "./Footer";

export default function Container() {
  return (
    <div className="bg-black flex flex-col items-center w-screen">
      <div className="h-screen w-9/12 flex flex-col">
        <AltHeader />
        <div className="flex-grow flex flex-row items-center w-5/12">
          <FormScaffold />
        </div>
        <Footer />
      </div>
    </div>
  );
}
