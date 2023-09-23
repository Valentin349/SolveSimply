export default function PhoneHtml({ aspect }: { aspect: number }) {
    return (
      <div className="h-full">
      <div className={`flex items-baseline ${aspect < 1.2 ? "" : "flex-col"}`}>
        <h2 className={`text-lightPink  font-black pr-1 lg:pr-3  ${aspect < 1.2 ? "text-[6px]" : "text-xl"}`}>AirBnB</h2>
        <h2 className={`text-darkPink  font-black  ${aspect < 1.2 ? "text-[6px]" : "text-xl"}`}>Assistant</h2>
      </div>

      <h2 className={`text-darkPink   ${aspect < 1.2 ? "text-[7px] text-center" : "text-3xl"}  font-black`}>24/7</h2>
      </div>
    );
  }
  