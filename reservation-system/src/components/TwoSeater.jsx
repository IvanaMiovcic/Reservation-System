function TwoSeaterAvaiHori() {
  return (
    <div>
      <div className="flex flex-row space-x-2 w-fit h-fit rounded-md p-2 bg-[#62c77f]">
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
      </div>
    </div>
  );
}

function TwoSeaterAvaiVerti() {
  return (
    <div>
      <div className="flex flex-col space-y-2 w-fit h-fit rounded-md p-2 bg-[#62c77f]">
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
      </div>
    </div>
  );
}

function TwoSeaterTakenHori() {
  return (
    <div>
      <div className="flex flex-row space-x-2 w-fit h-fit rounded-md p-2 bg-[#c76264]">
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
      </div>
    </div>
  );
}

function TwoSeaterTakenVerti() {
  return (
    <div>
      <div className="flex flex-col space-y-2 w-fit h-fit rounded-md p-2 bg-[#c76264]">
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
        <div className="bg-white w-6 h-6 rounded-[4px]"></div>
      </div>
    </div>
  );
}

export {
  TwoSeaterAvaiHori,
  TwoSeaterAvaiVerti,
  TwoSeaterTakenHori,
  TwoSeaterTakenVerti,
};
