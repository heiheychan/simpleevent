"use client";

export default function DatetimePicker({ name, value, setValue }) {
  let today = new Date();
  let dd = today.getDate(); //Current day
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear(); //(Year is 2022)
  let hh = today.getHours(); //Current hour
  let m = today.getMinutes(); //Current minutes

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (hh < 10) {
    hh = "0" + hh
  }
  if (m < 10) {
    m = "0" +m
  }

  return (
    <div className="w-full my-2">
      <p className="w-full">Datetime</p>
      <input
        value={value}
        type="datetime-local"
        className="w-full px-3 h-12 border border-gray-500 rounded-lg my-1 mb-1 outline-none"
        onChange={setValue}
        name={name}
        min={`${yyyy}-${mm}-${dd}T${hh}:${m}`}
      />
    </div>
  );
}
