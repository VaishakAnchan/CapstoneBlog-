import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log(token));
  },[]);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between bg-slate-900 text-white">
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <img className="w-8 h-8" src="src\assests\logo.png" alt="" />
        <span>Capstone blog</span>
      </Link>
      {/* mobile view */}
      <div className=" md:hidden">
      <button
          className="text-2xl focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "×" : "☰"}
        </button>
        {open && (
          <div className="absolute z-50 right-4 top-12 w-48 bg-white shadow-lg rounded-lg overflow-hidden text-black">
            <div className="flex flex-col py-2 px-4  hover:bg-gray-100 gap-3">
            <Link className="hover:text-blue-400 cursor-pointer  " to="/">Home</Link>
          <Link className="hover:text-blue-400 cursor-pointer  " to="/">Trending</Link>
          <Link className="hover:text-blue-400 cursor-pointer  " to="/">Most Popular</Link>
          <Link className="hover:text-blue-400 cursor-pointer  " to="/">About</Link>
          <Link className="hover:text-blue-400 cursor-pointer  " to="/">
            <button className=" py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-900">
              Login
            </button>
          </Link>
            </div>
          </div>
        )}
        </div>

      {/* desktop view */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className=" py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
