import React from "react";
import SearchIcon from "../../icons/SearchIcon.jsx";

const SearchBar = ({ setSearchBar, placeholder }) => {
  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      <div className={"w-[50%] h-[90%] relative flex"}>
        <input
          placeholder={placeholder}
          className={
            "w-full h-full border-2 border-black rounded-xl placeholder:text-black px-4"
          }
          onChange={(e) => setSearchBar(e.target.value)}
        />
        <SearchIcon
          className={"size-8 absolute right-0 mr-2 translate-y-[25%] stroke-2"}
        />
      </div>
    </div>
  );
};

export default SearchBar;
