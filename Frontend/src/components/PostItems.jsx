import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import Image from "./Image";

const PostItems = ({ post }) => {
  return (
    <div
      className="group bg-slate-900 rounded-lg overflow-hidden shadow-sm hover:shadow-xl 
                    transition-all duration-300 flex flex-col h-full"
    >
      {post.img && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.img}
            className="w-full h-full object-cover transform transition-transform duration-300 
                       group-hover:scale-105"
            w="735"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 p-5 flex-grow">
        <Link
          to={`/${post.slug}`}
          className="text-xl font-semibold text-gray-50 hover:text-blue-600 
                     transition-colors line-clamp-2 mb-2"
        >
          {post.title}
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>By</span>
          <Link
            to={`/posts?author=${post.user.username}`}
            
            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            {post.user.username}
          </Link>
          <span>in</span>
          <Link
            to={`/posts?category=${post.category}`}
            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            {post.category}
          </Link>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
          {post.desc}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            {format(post.createdAt)}
          </span>
          <Link
            to={`/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 
                      font-medium transition-colors group-hover:translate-x-1 duration-300"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItems;
