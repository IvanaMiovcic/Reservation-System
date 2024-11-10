export default function Footer() {
  let current_year = new Date().getFullYear();

  return (
    <div className="flex pb-10 sm:pb-6">
      <div className="font-poppins text-xs text-slate-400">
        SmartQ &copy; {current_year}
      </div>
    </div>
  );
}
