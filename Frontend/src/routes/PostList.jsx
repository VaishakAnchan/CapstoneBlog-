import React, { useState } from "react";
import Postlist from "../components/Postlist";
import SideMenu from "../components/SideMenu";

const PostList = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <h1 className="mb-8 text-2xl">Developmet Blog</h1>
      <button
        className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden"
        onClick={() => setOpen((pr) => !pr)}
      >
        {open ? "close" : "Filter or Search"}
      </button>
      <div className="gap-8 flex flex-col-reverse md:flex-row">
        <div className="">
          <Postlist />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default PostList;
