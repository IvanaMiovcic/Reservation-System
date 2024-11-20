function FourSeaterAvai() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 w-fit h-fit rounded-md p-2 bg-[#62c77f]">
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
      </div>
    </div>
  );
}

function FourSeaterTaken() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 w-fit h-fit rounded-md p-2 bg-[#c76264]">
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
      </div>
    </div>
  );
}

export { FourSeaterAvai, FourSeaterTaken };
