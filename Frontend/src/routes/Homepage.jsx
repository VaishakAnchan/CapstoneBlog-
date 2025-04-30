import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Maincat from "../components/Maincat";
import FeaturedPost from "../components/FeaturedPost";
import Postlist from "../components/Postlist";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section - Dark theme with accent gradients */}
      <section className="relative overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-64 h-64 bg-amber-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-72 h-72 bg-fuchsia-500 rounded-full opacity-10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10">
          <motion.div
            className="grid md:grid-cols-5 gap-12 items-center"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.div className="md:col-span-3" variants={fadeInUp}>
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-medium rounded-full text-sm mb-6">
                Discover Content
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-200 via-emerald-200 to-fuchsia-200 text-transparent bg-clip-text leading-tight">
                Where Ideas Take Flight
              </h1>
              <p className="mt-6 text-lg text-slate-300 max-w-2xl">
                Join our community of thinkers, creators, and innovators sharing
                perspectives that challenge, inspire, and transform.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <motion.button
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/20 text-black font-medium flex items-center gap-2 transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/posts')}
                >
                  Explore Articles
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  className="px-8 py-4 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 font-medium rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Browse Topics
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2 flex justify-center md:justify-end"
              variants={fadeInUp}
            >
              <Link to="/write" className="relative block">
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-fuchsia-400 rounded-2xl blur opacity-70"
                  animate={{
                    opacity: [0.7, 0.9, 0.7],
                    rotate: [0, 5, 0],
                    scale: [0.98, 1.01, 0.98],
                  }}
                  transition={{
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                ></motion.div>
                <motion.div
                  className="relative flex flex-col items-center bg-slate-800 rounded-2xl p-8 border border-slate-700 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-emerald-400 to-fuchsia-400 rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-emerald-400/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-10 h-10 text-black"
                    >
                      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                      <path d="M2 2l7.586 7.586"></path>
                      <path d="M11 11l5 5"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">
                    Share Your Story
                  </h3>
                  <p className="text-slate-400 text-center mb-6">
                    Your voice matters. Write something extraordinary.
                  </p>
                  <span className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-medium text-black hover:from-emerald-600 hover:to-teal-700 transition-colors">
                    Start Writing
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Section */}
      <section className="bg-slate-900 py-16">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-emerald-400 font-medium mb-3 block">
                Navigate
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Popular Topics</h2>
            </div>
            <Link
              to="/categories"
              className="group text-slate-300 hover:text-emerald-400 font-medium flex items-center gap-1 mt-4 md:mt-0 transition-colors"
            >
              Browse all categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="relative z-10">
            <Maincat />
          </div>
        </motion.div>
      </section>

      {/* Featured Posts - With glass morphism cards */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 py-16 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-emerald-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500 rounded-full opacity-5 blur-3xl"></div>

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-amber-400 font-medium mb-3 block">
                Highlights
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Featured Stories
              </h2>
            </div>
            <Link
              to="/posts"
              className="group text-slate-300 hover:text-amber-400 font-medium flex items-center gap-1 mt-4 md:mt-0 transition-colors"
            >
              View all features
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="relative z-10">
            <FeaturedPost />
          </div>
        </motion.div>
      </section>

      {/* Recent Posts - Card grid */}
      <section className="bg-slate-800 py-16">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-fuchsia-400 font-medium mb-3 block">
                Fresh Content
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Latest Articles
              </h2>
            </div>
            <Link
              to="/posts"
              className="group text-slate-300 hover:text-fuchsia-400 font-medium flex items-center gap-1 mt-4 md:mt-0 transition-colors"
            >
              View all articles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="relative z-10">
            <Postlist />
          </div>
        </motion.div>
      </section>

      {/* Newsletter with gradient background */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20 overflow-hidden">
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-white/[0.03]"></div>
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-emerald-600 rounded-full opacity-10 blur-3xl"></div>

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-fuchsia-400 rounded-2xl blur opacity-30"
              animate={{
                opacity: [0.2, 0.3, 0.2],
                scale: [0.99, 1.01, 0.99],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            ></motion.div>

            <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl px-6 py-12 md:p-12 border border-slate-700">
              <div className="text-center mb-10">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-fuchsia-500 text-black font-medium rounded-full text-sm mb-4">
                  Stay Connected
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Join Our Newsletter
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  Get exclusive access to our latest articles, insights, and
                  special offers delivered straight to your inbox.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-4 bg-slate-700 border border-slate-600 focus:border-emerald-500 rounded-lg text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
                <motion.button
                  className="px-6 py-4 bg-gradient-to-r from-amber-500 to-fuchsia-600 text-black font-medium rounded-lg hover:from-amber-600 hover:to-fuchsia-700 transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </div>

              <p className="text-sm text-slate-400 text-center mt-6">
                No spam, ever. We value your privacy and you can unsubscribe at
                any time.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Homepage;

// import React from "react";
// import { Link } from "react-router-dom";
// import Maincat from "../components/Maincat";
// import FeaturedPost from "../components/FeaturedPost";
// import Postlist from "../components/Postlist";

// const Homepage = () => {
//   return (
//     <div className=" mt-4 flex flex-col gap-4">
//       {/* <div className="flex gap-4">
//         <Link to="/">Home</Link>
//         <span>-</span>
//         <span className="text-blue-600 ">Blogs and Articles</span>
//       </div> */}
//       {/* INTrO */}
//       <div className="flex items-center justify-between">
//         <div className="">
//           <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">
//             New Artical and the NEw blog posts title
//           </h1>
//           <p className="mt-8 text-md md:text-xl">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
//             ipsum provident aperiam ipsam iste ullam omnis consectetur, debitis
//             odit rerum, nobis corrupti cupiditate facere tempora molestiae dicta
//             at velit eos.
//           </p>
//         </div>
//         <Link to="/write" className="hidden md:block relative">
//           <svg
//             viewBox="0 0 200 200"
//             width="200"
//             height="200"
//             className="text-lg tracking-widest animate-spin animatedButton"
//             // className="text-lg tracking-widest"
//           >
//             <path
//               id="circlePath"
//               fill="none"
//               d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
//             />
//             <text>
//               <textPath href="#circlePath" startOffset="0%">
//                 Write your story •
//               </textPath>
//               <textPath href="#circlePath" startOffset="50%">
//                 Share your idea •
//               </textPath>
//             </text>
//           </svg>
//           <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="50"
//               height="50"
//               fill="none"
//               stroke="white"
//               strokeWidth="2"
//             >
//               <line x1="6" y1="18" x2="18" y2="6" />
//               <polyline points="9 6 18 6 18 15" />
//             </svg>
//           </button>
//         </Link>
//       </div>
//       <Maincat />
//       <FeaturedPost />
//       {/* Post lists */}
//       <div className="">
//         <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
//         <Postlist />
//       </div>
//     </div>
//   );
// };

// export default Homepage;
