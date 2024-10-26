import React, { useEffect } from "react";
import ChevronIcon from "../../icons/ChevronIcon.jsx";

function OneOptionDropdown({
  containerClassName,
  labelClassname,
  optionsName,
  options,
  setOption,
}) {
  useEffect(() => {
    if (options.length > 0) {
      setOption(options[0].value);
      console.log(options[0]);
    }
  }, [setOption]);

  return (
    <div className={containerClassName}>
      <label className={labelClassname}>{optionsName}</label>
      <div className={"w-full flex relative"}>
        <select
          onChange={(e) => setOption(e.target.value)}
          className={
            "w-full h-[50px] border-2 border-black rounded-lg text-xl px-2 bg-no-repeat appearance-none"
          }
        >
          {options.map((opt, index) => (
            <option value={opt.value} key={index}>
              {opt.display}
            </option>
          ))}
        </select>
        <ChevronIcon
          className={
            "size-10 absolute right-0 rotate-180 top-0 translate-y-1.5 mr-2 pointer-events-none"
          }
        />
      </div>
    </div>
  );
}

export default OneOptionDropdown;
