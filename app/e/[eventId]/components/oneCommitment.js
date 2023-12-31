import ReactTimeAgo from "react-time-ago";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

export default function OneCommitment({ name, comment, commitDate }) {

  TimeAgo.addLocale(en)

  return (
    <div className="w-full border-l-2 border-l-gray-300 flex flex-row justify-between items-start p-4 pt-0 relative">
      <div className="flex flex-col items-start w-4/5 pl-2">
        <p className="pb-2">
          <span>{name}</span> is bringing it
          {comment !== "" && " and commented:"}
        </p>
        <div
          className={`px-6 border-gray-300 rounded-lg  
            ${comment !== "" ? "py-4 border" : "py-2"}`}
        >
          {comment}
        </div>
      </div>
      <div className="w-1/5 text-gray-500 text-xs pt-1">
        <ReactTimeAgo date={new Date(commitDate).getTime()} locale="en-US" />
      </div>
      <div className="h-[25px] w-[25px] rounded-full bg-white absolute -left-[13px] flex justify-center items-center">
        <div className="h-[15px] w-[15px] rounded-full bg-green-500 border border-green-300 animate-pulse"></div>
      </div>
    </div>
  );
}
