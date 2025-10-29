"use client";
import { hotelService } from "@/service/hotelService";
import React, { useState } from "react";

const SearchComponent = () => {
  const [search, setSearch] = useState<string>("");
  console.log("search hotel",search);
  
  const handleClick =async ()=>{
    hotelService.search(search)
  }

  return (
    <div className="w-full  rounded-[5px] flex gap-2">
      <input
        type="text"
        placeholder="search hotels"
        className="px-2 h-[40] rounded-[5px] bg-gray-300  w-full outline-none border-none"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button 
      onClick={handleClick}
      className="bg-[#72756c] hover:bg-[#484946] rounded-[5px] cursor-pointer px-10 text-white">
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
