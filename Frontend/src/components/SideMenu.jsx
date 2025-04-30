import React from "react";
import {  useSearchParams } from "react-router-dom";
import Search from "./Searchb";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };
  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };
  return (
    <div className="px-20 h-max sticky top-8">
      <h1 className="mb-2  text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-5 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onClick={handleFilterChange}
            value="newest"
            className=" bg-white appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-700"
          />
          Newest
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onClick={handleFilterChange}
            value="popular"
            className=" bg-white  appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-700"
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onClick={handleFilterChange}
            value="trending"
            className=" bg-white appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-700"
          />
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onClick={handleFilterChange}
            value="oldest"
            className=" bg-white appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-700"
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-5 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span
          className="underline  cursor-pointer "
          onClick={() => handleCategoryChange("general")}
        >
          All
        </span>
        <span
          className="underline  cursor-pointer "
          onClick={() => handleCategoryChange("web-design")}
        >
          Web Design
        </span>
        <span
          className="underline  cursor-pointer "
          onClick={() => handleCategoryChange("development")}
        >
          Development
        </span>
        <span
          className="underline  cursor-pointer "
          onClick={() => handleCategoryChange("database")}
        >
          Database
        </span>
        <span
          className="underline cursor-pointer  "
          onClick={() => handleCategoryChange("seo")}
        >
          Search Engines
        </span>
        <span
          className="underline  cursor-pointer "
          onClick={() => handleCategoryChange("marketing")}
        >
          Marketing
        </span>
      </div>
    </div>
  );
};

export default SideMenu;
