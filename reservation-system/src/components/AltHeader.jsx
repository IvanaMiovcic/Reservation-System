import Logo from "./Logo";

export default function Header() {
  return (
    <div className="flex flex-row justify-between pt-10 sm:pb-6">
      <div className="flex flex-row justify-center items-center gap-2 font-poppins text-white text-xl">
        <Logo />
        <div>SmartQ</div>
      </div>
    </div>
  );
}
