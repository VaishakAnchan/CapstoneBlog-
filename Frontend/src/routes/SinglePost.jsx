import React, { useEffect } from "react";
import Image from "../components/Image";
import { Link, useParams } from "react-router-dom";
import PostMenu from "../components/PostMenu";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { Search, Calendar, Tag, User, Instagram, Facebook, Bookmark, Share2, MessageCircle, Heart } from "lucide-react";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePost = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      },
    }),
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading article...</p>
        </motion.div>
      </div>
    );
  }
  
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-screen"
      >
        <div className="max-w-md p-8 bg-red-50 rounded-xl shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <Link to="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Return to Home
          </Link>
        </div>
      </motion.div>
    );
  }
  
  if (!data) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-screen"
      >
        <div className="max-w-md p-8 bg-yellow-50 rounded-xl shadow-sm text-center">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Post not found!</h2>
          <p className="text-gray-700 mb-4">The article you're looking for doesn't exist or may have been removed.</p>
          <Link to="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Explore other articles
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { staggerChildren: 0.08 }
        }
      }}
      className="flex flex-col gap-8 max-w-6xl mx-auto px-4 md:px-8 py-8"
    >
      {/* Hero Section */}
      <motion.div 
        variants={fadeIn}
        custom={0}
        className="max-w-4xl mx-auto mb-16"
      >
        {data.img && (
          <motion.div 
            variants={fadeIn}
            custom={1}
            className="aspect-[16/9] overflow-hidden rounded-xl shadow-xl mb-8"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={data.img}
              w="1200"
              className="w-full h-full object-cover transition-transform duration-700"
            />
          </motion.div>
        )}

        <div className="space-y-6">
          <motion.h1 
            variants={fadeIn}
            custom={2}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-center text-slate-50"
          >
            {data.title}
          </motion.h1>

          <motion.div 
            variants={fadeIn}
            custom={3}
            className="flex items-center space-x-4 text-sm pl-64 text-slate-500"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium text-slate-500">
                By {data.user.username}
              </span>
            </span>
            <span>•</span>
            <Link className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Tag className="w-4 h-4" />
              {data.category}
            </Link>
            <span>•</span>
            <time className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-4 h-4" />
              {format(data.createdAt)}
            </time>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            custom={4}
            className="flex gap-4 pl-64 space-x-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>124</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>24 Comments</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              <span>Save</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </motion.button>
          </motion.div>

          <motion.p 
            variants={fadeIn}
            custom={5}
            className="text-xl text-center text-slate-400 max-w-4xl leading-relaxed border-b-4 border-blue-500 pl-6 py-2  rounded-r-lg"
          >
            {data.desc}
          </motion.p>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Article Content */}
        <motion.div 
          variants={fadeIn}
          custom={6}
          className="lg:text-lg flex-1 flex flex-col gap-8 text-slate-200 leading-relaxed"
        >
          <div
            className="content prose prose-lg max-w-none prose-headings:text-slate-800 prose-headings:font-serif prose-a:text-blue-600 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data.content),
            }}
          ></div>
          
          {/* Article paragraphs with motion animations */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
            <motion.p 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.05), duration: 0.5 }}
              className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-blue-600"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
              earum ducimus nemo pariatur enim fuga sit ab voluptatibus maxime,
              possimus vero sed laboriosam officiis sint libero voluptatem,
              molestiae fugiat, temporibus expedita quia aut quo porro non?
              Quibusdam deleniti illum ipsum, nobis nemo id deserunt, officia, ex
              maxime fuga inventore vitae Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Quod accusamus natus eveniet, aliquam nulla
              facilis deleniti beatae sint repellat mollitia.
            </motion.p>
          ))}
          
          {/* Article Tags */}
          <motion.div 
            variants={fadeIn}
            custom={7}
            className="flex flex-wrap gap-2 mt-8"
          >
            <span className="text-sm text-slate-600 font-medium">Tags:</span>
            {["Development", "Frontend", "Tutorial", "React"].map((tag, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05, backgroundColor: "#E1F5FE" }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          variants={fadeIn}
          custom={8}
          className="lg:w-80 h-max sticky top-8 space-y-8"
        >
          {/* Author Card */}
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800 rounded-xl shadow-sm border border-slate-900 p-6"
          >
            <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Author
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                {data.user.img ? (
                  <img
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                    src={data.user.img}
                    alt=""
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-500" />
                  </div>
                )}
                <div>
                  <Link className="font-medium text-lg text-slate-100 hover:text-blue-600 transition-colors">
                    {data.user.username}
                  </Link>
                  <p className="text-sm text-slate-400">Content Creator</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Writer, developer, and technology enthusiast sharing insights and tutorials.
              </p>
              <div className="flex gap-3 mt-1">
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                  href="#"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                  href="#"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Follow
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Post Actions */}
          <PostMenu post={data} />

          {/* Categories */}
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800 rounded-xl shadow-sm border border-slate-900 p-6"
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-600" />
              Categories
            </h3>
            <div className="flex flex-col gap-3 text-slate-200">
              {["All", "Web Design", "Development", "Database", "Search Engines", "Marketing"].map((category, i) => (
                <Link 
                  key={i}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all"
                  to="/"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Search */}
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800 rounded-xl shadow-sm border border-slate-900 p-6"
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Search
            </h3>
            <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-2 border border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search
                className="w-5 h-5 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search posts..."
                className="bg-transparent w-full focus:outline-none text-slate-700"
              />
            </div>
          </motion.div>

          {/* Popular Posts - New Section */}
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800 rounded-xl shadow-sm border border-slate-900 p-6"
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-blue-600" />
              Popular Posts
            </h3>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 3 }}
                  className="flex gap-3"
                >
                  <div className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img src="https://th.bing.com/th?q=Development.+Clip+Art&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="Popular post thumbnail" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <Link className="font-medium text-slate-100 line-clamp-2 hover:text-blue-600 transition-colors">
                      {i === 0 ? "Modern Web Development in 2025" : 
                       i === 1 ? "The Future of JavaScript Frameworks" : 
                                "Building Scalable APIs with Node.js"}
                    </Link>
                    <p className="text-xs text-slate-500">{format(new Date(2025, 3, 15 - i*5).toISOString())}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12 text-black"
      >
        <Comments postId={data._id} />
      </motion.div>

      {/* Related Posts - New Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-serif font-bold text-slate-100 mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100"
            >
              <div className="h-48 bg-slate-200 overflow-hidden">
                <img src="https://th.bing.com/th/id/OIP.UhnZs_RgbtVTR56Rsrm40gHaEE?w=328&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Related post" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{["Development", "Design", "Tutorial"][i]}</span>
                <h3 className="mt-3 text-lg font-semibold text-slate-800 line-clamp-2">
                  {i === 0 ? "Getting Started with React and Tailwind CSS" : 
                   i === 1 ? "Building Responsive Layouts: Best Practices" : 
                            "Understanding State Management in Modern Apps"}
                </h3>
                <p className="mt-2 text-slate-600 line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto earum ducimus nemo pariatur enim fuga.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                    <span className="text-xs text-slate-600">Jane Doe</span>
                  </div>
                  <span className="text-xs text-slate-500">{format(new Date(2025, 3, 20 - i*3).toISOString())}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Newsletter - New Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white max-w-md">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h3>
            <p className="text-blue-100 mb-4">Get the latest articles, tutorials and resources delivered directly to your inbox.</p>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 min-w-0 w-full sm:w-64"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-xs text-blue-100 mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SinglePost;


// import React from "react";
// import Image from "../components/Image";
// import { Link, useParams } from "react-router-dom";
// import PostMenu from "../components/PostMenu";
// import Comments from "../components/Comments";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { format } from "timeago.js";
// import DOMPurify from "dompurify";

// // const stripHtmlTags = (html) => {
// //   const doc = new DOMParser().parseFromString(html, 'text/html');
// //   return doc.body.textContent || "";
// // };

// const fetchPost = async (slug) => {
//   const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
//   return res.data;
// };

// const SinglePost = () => {
//   const { slug } = useParams();

//   const { isPending, error, data } = useQuery({
//     queryKey: ["post", slug],
//     queryFn: () => fetchPost(slug),
//   });

//   if (isPending) return "loading...";
//   if (error) return "Something went worng!" + error.message;
//   if (!data) return "Post not found!";

//   return (
//     <div className="flex flex-col gap-8">
//       <div className="max-w-4xl mx-auto mb-16">
//         {data.img && (
//           <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-lg mb-8">
//             <Image
//               src={data.img}
//               w="1200"
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//         )}

//         <div className="space-y-6 text-center">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-gray-50">
//             {data.title}
//           </h1>

//           <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
//             <span className="flex items-center">
//               <span className="font-medium text-gray-900">
//                 By {data.user.username}
//               </span>
//             </span>
//             <span>•</span>
//             <Link className="hover:text-blue-600 transition-colors">
//               {data.category}
//             </Link>
//             <span>•</span>
//             <time className="text-gray-500">{format(data.createdAt)}</time>
//           </div>

//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             {data.desc}
//           </p>
//         </div>
//       </div>
//       <div className="flex flex-col md:flex-row gap-12">
//         <div className="lg:text-lg flex flex-col gap-6 text-justify">
//           <div
//             className="content"
//             dangerouslySetInnerHTML={{
//               __html: DOMPurify.sanitize(data.content),
//             }}
//           ></div>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
//             earum ducimus nemo pariatur enim fuga sit ab voluptatibus maxime,
//             possimus vero sed laboriosam officiis sint libero voluptatem,
//             molestiae fugiat, temporibus expedita quia aut quo porro non?
//             Quibusdam deleniti illum ipsum, nobis nemo id deserunt, officia, ex
//             maxime fuga inventore vitae Lorem ipsum dolor sit amet consectetur,
//             adipisicing elit. Quod accusamus natus eveniet, aliquam nulla
//             facilis deleniti beatae sint repellat mollitia.
//           </p>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
//             earum ducimus nemo pariatur enim fuga sit ab voluptatibus maxime,
//             possimus vero sed laboriosam officiis sint libero voluptatem,
//             molestiae fugiat, temporibus expedita quia aut quo porro non?
//             Quibusdam deleniti illum ipsum, nobis nemo id deserunt, officia, ex
//             maxime fuga inventore vitae Lorem ipsum dolor sit amet consectetur,
//             adipisicing elit. Quod accusamus natus eveniet, aliquam nulla
//             facilis deleniti beatae sint repellat mollitia.
//           </p>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
//             earum ducimus nemo pariatur enim fuga sit ab voluptatibus maxime,
//             possimus vero sed laboriosam officiis sint libero voluptatem,
//             molestiae fugiat, temporibus expedita quia aut quo porro non?
//             Quibusdam deleniti illum ipsum, nobis nemo id deserunt, officia, ex
//             maxime fuga inventore vitae Lorem ipsum dolor sit amet consectetur,
//             adipisicing elit. Quod accusamus natus eveniet, aliquam nulla
//             facilis deleniti beatae sint repellat mollitia.
//           </p>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
//             earum ducimus nemo pariatur enim fuga sit ab voluptatibus maxime,
//             possimus vero sed laboriosam officiis sint libero voluptatem,
//             molestiae fugiat, temporibus expedita quia aut quo porro non?
//             Quibusdam deleniti illum ipsum, nobis nemo id deserunt, officia, ex
//             maxime fuga inventore vitae Lorem ipsum dolor sit amet consectetur,
//             adipisicing elit. Quod accusamus natus eveniet, aliquam nulla
//             facilis deleniti beatae sint repellat mollitia.
//           </p>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
//             earum ducimus nemo pariatur enim fuga sit ab voluptatibus maxime,
//             possimus vero sed laboriosam officiis sint libero voluptatem,
//             molestiae fugiat, temporibus expedita quia aut quo porro non?
//             Quibusdam deleniti illum ipsum, nobis nemo id deserunt, officia, ex
//             maxime fuga inventore vitae Lorem ipsum dolor sit amet consectetur,
//             adipisicing elit. Quod accusamus natus eveniet, aliquam nulla
//             facilis deleniti beatae sint repellat mollitia.
//           </p>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
//             earum ducimus nemo pariatur enim fuga sit ab voluptatibus maxime,
//             possimus vero sed laboriosam officiis sint libero voluptatem,
//             molestiae fugiat, temporibus expedita quia aut quo porro non?
//             Quibusdam deleniti illum ipsum, nobis nemo id deserunt, officia, ex
//             maxime fuga inventore vitae Lorem ipsum dolor sit amet consectetur,
//             adipisicing elit. Quod accusamus natus eveniet, aliquam nulla
//             facilis deleniti beatae sint repellat mollitia.
//           </p>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
//             earum ducimus nemo pariatur enim fuga sit ab voluptatibus maxime,
//             possimus vero sed laboriosam officiis sint libero voluptatem,
//             molestiae fugiat, temporibus expedita quia aut quo porro non?
//             Quibusdam deleniti illum ipsum, nobis nemo id deserunt, officia, ex
//             maxime fuga inventore vitae Lorem ipsum dolor sit amet consectetur
//             adipisicing elit. Itaque nam iure voluptatibus qui placeat non aut,
//             vel earum quam cumque!
//           </p>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
//             earum ducimus nemo pariatur enim fuga sit ab voluptatibus maxime,
//             possimus vero sed laboriosam officiis sint libero voluptatem,
//             molestiae fugiat, temporibus expedita quia aut quo porro non?
//             Quibusdam deleniti illum ipsum, nobis nemo id deserunt, officia, ex
//             maxime fuga inventore vitael Lorem ipsum dolor sit amet consectetur,
//             adipisicing elit. Cupiditate quas suscipit adipisci nihil voluptas
//             vel obcaecati excepturi earum officiis reiciendis?
//           </p>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
//             earum ducimus nemo pariatur enim fuga sit ab voluptatibus maxime,
//             possimus vero sed laboriosam officiis sint libero voluptatem,
//             molestiae fugiat, temporibus expedita quia aut quo porro non?
//             Quibusdam deleniti illum ipsum, nobis nemo id deserunt, officia, ex
//             maxime fuga inventore vitael Lorem ipsum dolor sit amet consectetur,
//             adipisicing elit. Cupiditate quas suscipit adipisci nihil voluptas
//             vel obcaecati excepturi earum officiis reiciendis?
//           </p>
//         </div>
//         <div className="px-4 h-max sticky top-8">
//           <h1 className=" mb-4 text-sm font-medium">Author</h1>
//           <div className="flex flex-col gap-4">
//             <div className="flex items-center gap-8">
//               {data.user.img && (
//                 <img
//                   className="w-12 h-12 rounded-full object-cover"
//                   src={data.user.img}
//                   alt=""
//                 />
//               )}
//               <Link className="text-blue-800">{data.user.username}</Link>
//             </div>
//             <p className="text-sm text-gray-500">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
//               accusamus.
//             </p>
//             <div className="flex gap-2 mt-1">
//               <Link>
//                 <img
//                   className="h-10 w-10"
//                   src="src\assests\instagram-vector-icon_1263898-140.jpg"
//                   alt=""
//                 />
//               </Link>
//               <Link>
//                 <img
//                   className="h-10 w-10"
//                   src="src\assests\1-13035_facebook-logo-comments-facebook-logo-vector-jpg.png"
//                   alt=""
//                 />
//               </Link>
//             </div>
//           </div>
//           <PostMenu post={data} />
//           <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
//           <div className="flex flex-col gap-2 text-sm">
//             <Link className="underline">All</Link>
//             <Link className="underline" to="/">
//               Web Design
//             </Link>
//             <Link className="underline" to="/">
//               Development
//             </Link>
//             <Link className="underline" to="/">
//               Database
//             </Link>
//             <Link className="underline" to="/">
//               Search Engines
//             </Link>
//             <Link className="underline" to="/">
//               Marketing
//             </Link>
//           </div>
//           <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
//           <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24 "
//               width="20"
//               height="20"
//               fill="none"
//               stroke="gray"
//             >
//               <circle cx="10.5 " cy="10.5" r="7.5" />
//               <line x1="16.5 " y1="16.5" x2="22" y2="22" />
//             </svg>
//             <input
//               type="text"
//               placeholder="search  a post..."
//               className="bg-transparent"
//             />
//           </div>
//         </div>
//       </div>
//       <Comments postId={data._id} />
//     </div>
//   );
// };

// export default SinglePost;
