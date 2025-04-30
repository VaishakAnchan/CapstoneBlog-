import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
// import img from "./img";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPost = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending) return "loading...";
  if (error) return "Something went worng!" + error.message;

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  return (
    <>
      {/* 1 */}
      <div className="mt-8 flex flex-col lg:flex-row gap-7">
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          {posts[0].img && (
            <img src="src\assests\web.png" className="rounded-3xl h-80 w-4/5" />
          )}
          <div className="flex items-center gap-3">
            <h1 className="font-semibold  lg:text-lg">01.</h1>
            <Link className="text-blue-800 lg:text-lg">
              {posts[0].category}
            </Link>
            <span className="text-gray-500 ">{format(posts[0].createdAt)}</span>
          </div>
          <Link
            to={posts[0].slug}
            className="text-xl lg:text-xl font-semibold lg:font-bold"
          >
            {posts[0].title}
          </Link>
        </div>
        {/* 2 */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          {posts[1] && (
            <div className="lg:h-1/2 flex justify-between gap-2">
              {posts[1].img && (
                <div className=" w-1/3 aspect-video">
                  <img
                    src="src\assests\web2.png"
                    alt=""
                    className="rounded-3xl object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="w-2/3">
                <div className="flex items-center gap-3 text-sm lg:text-base mb-3">
                  <h1 className="font-semibold">02.</h1>
                  <Link className="text-blue-800">{posts[1].category}</Link>
                  <span className="text-gray-500 text-sm">
                    {format(posts[1].createdAt)}
                  </span>
                </div>
                <Link
                  to={posts[1].slug}
                  className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-xl font-medium"
                >
                  {posts[1].title}
                </Link>
              </div>
            </div>
          )}

          {/* 3 */}
          {posts[2] && (
            <div className="lg:h-1/2 flex justify-between gap-2">
              {posts[2].img && (
                <div className=" w-1/3 aspect-video">
                  <img
                    src="src\assests\web2.png"
                    alt=""
                    className="rounded-3xl object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="w-2/3">
                <div className="flex items-center gap-3 text-sm lg:text-base mb-3">
                  <h1 className="font-semibold">02.</h1>
                  <Link className="text-blue-800">{posts[2].category}</Link>
                  <span className="text-gray-500 text-sm">
                    {format(posts[2].createdAt)}
                  </span>
                </div>
                <Link
                  to={posts[2].slug}
                  className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-xl font-medium"
                >
                  {posts[2].title}
                </Link>
              </div>
            </div>
          )}

          {/* 4th */}
          {posts[3] && (
            <div className="lg:h-1/2 flex justify-between gap-2">
              {posts[3].img && (
                <div className=" w-1/3 aspect-video">
                  <img
                    src="src\assests\web2.png"
                    alt=""
                    className="rounded-3xl object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="w-2/3">
                <div className="flex items-center gap-3 text-sm lg:text-base mb-3">
                  <h1 className="font-semibold">02.</h1>
                  <Link className="text-blue-800">{posts[3].category}</Link>
                  <span className="text-gray-500 text-sm">
                    {format(posts[3].createdAt)}
                  </span>
                </div>
                <Link
                  to={posts[3].slug}
                  className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-xl font-medium"
                >
                  {posts[3].title}
                </Link>
              </div>
            </div>
          )}
          {/* <div className='lg:h-1/2 flex justify-between gap-3'></div> */}
          {/* <div className='lg:h-1/2 flex justify-between gap-3'></div> */}
        </div>
      </div>
    </>
  );
};

export default FeaturedPost;
