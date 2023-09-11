export default function PhoneHtml({ aspect }: { aspect: number }) {
    return (
      <div className="h-full">
      <div className={`flex items-baseline ${aspect < 1.2 ? "" : "flex-col"}`}>
        <h2 className="text-lightPink text-md font-black pr-3">AirBnB</h2>
        <h2 className="text-darkPink text-md font-black">Assistant</h2>
      </div>

      <h2 className="text-darkPink text-center text-3xl font-black">24/7</h2>
      </div>
    );
  }
  