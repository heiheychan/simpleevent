import EventFood from "./components/eventFood";


export default function page(props) {

  console.log(props)
  return (
    <div className="flex flex-col items-center">
      {/* Event info section */}
      <div className="container mt-8">
        <div className="flex flex-row items-center mb-2">
          <h1 className="text-lg font-bold mr-2">7/6 Potluck in Midway</h1>
          <div className="py-1 pl-2 pr-3 mr-2 rounded-full bg-gray-100 flex">
            <div className="rounded-full border border-gray-800 bg-gray-500 h-[15px] w-[15px] -mr-1"></div>
            <div className="rounded-full border border-gray-800 bg-gray-500 h-[15px] w-[15px] -mr-1"></div>
            <div className="rounded-full border border-gray-800 bg-gray-500 h-[15px] w-[15px] -mr-1"></div>
            <div className="rounded-full border border-gray-800 bg-gray-500 h-[15px] w-[15px] -mr-1"></div>
          </div>
          <div className="text-sm">5/12</div>
        </div>
        {/* When */}
        <div className="mb-1">
          <p>DEC 31 Sat - 7:30 PM</p>
        </div>
        {/* Where */}
        <div>
          <p>Midway Island</p>
        </div>
      </div>
      {/* Food list */}
      <div className="container">
        <h1 className="text-lg font-bold mt-6 mb-3">What to bring</h1>
        <EventFood />
        <EventFood />
        <EventFood />
        <EventFood />
        <EventFood />
      </div>
    </div>
  );
}
