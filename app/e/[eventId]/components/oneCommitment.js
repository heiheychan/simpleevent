import ReactTimeAgo from "react-time-ago";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

export default function OneCommitment({ name, comment, commitDate }) {

  TimeAgo.addLocale(en)

  return (
    <div className="w-full border-l-2 border-l-gray-500 flex flex-row justify-between items-start p-4 pt-0 relative">
      <div className="flex flex-col items-start w-4/5 pl-2">
        <p className="pb-2">
          <span className="font-bold text-gray-500">{name}</span> is bringing it
          {comment !== "" && "and commented:"}
        </p>
        <div
          className={`px-6 py-4 border-gray-300 rounded-lg ${
            comment !== "" && "border"
          }`}
        >
          {comment}
        </div>
      </div>
      <div className="w-1/5 text-gray-500 text-xs pt-1">
        <ReactTimeAgo date={new Date(commitDate).getTime()} locale="en-US" />
      </div>
      <div className="h-[25px] w-[25px] rounded-full bg-white absolute -left-[13px] flex justify-center items-center">
        <div className="h-[15px] w-[15px] rounded-full bg-gray-300 border border-gray-500"></div>
      </div>
    </div>
  );
}
