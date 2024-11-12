import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingBody from "./components/LandingBody";

export default function Landing() {
  return (
    <div className="bg-black flex flex-col items-center w-screen">
      <div className="h-screen w-9/12 flex flex-col">
        <Header />
        <div className="flex-grow content-center">
          <LandingBody />
        </div>
        <Footer />
      </div>
    </div>
  );
}
