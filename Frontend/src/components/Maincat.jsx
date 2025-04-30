import React from "react";
import { Link } from "react-router-dom";
import Search from "./Searchb";

const Maincat = () => {
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-3 shadow-lg items-center justify-center gap-8 text-black">
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <Link
          to="/posts"
          className="bg-blue-800 text-white rounded-full px-4 py-2"
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=web-design"
          className="hover:bg-blue-50 rounded-full px-4 py-2
           "
        >
          Web Design
        </Link>
        <Link
          to="/posts?cat=develompent"
          className="hover:bg-blue-50 rounded-full px-4 py-2
           "
        >
          Development
        </Link>
        <Link
          to="/posts?cat=database"
          className="hover:bg-blue-50 rounded-full px-4 py-2
           "
        >
          Database
        </Link>
        <Link
          to="/posts?cat=seo"
          className="hover:bg-blue-50 rounded-full px-4 py-2
           "
        >
          Search Engines
        </Link>
        <Link
          to="/posts?cat=marketing"
          className="hover:bg-blue-50 rounded-full px-4 py-2
           "
        >
          Marketing
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      <Search />
    </div>
  );
};

export default Maincat;
