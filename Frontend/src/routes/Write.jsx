import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Upload from "../components/Upload";
import { PlusCircle, Image, Video, Loader2, Send, X } from "lucide-react";

const Write = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [showTip, setShowTip] = useState(true);

  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const { getToken } = useAuth();
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-gray-600 font-medium">Loading your workspace...</p>
        </motion.div>
      </div>
    );
  }

  if (isLoaded && !isSignedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 bg-slate-700 rounded-xl shadow-lg max-w-md w-full text-center"
        >
          <div className="p-3 bg-red-100 inline-block rounded-full mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-50 mb-2">Authentication Required</h2>
          <p className="text-gray-200 mb-6">You need to be signed in to create content on Capstone Blog.</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      img: cover?.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    mutation.mutate(data);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
      className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] bg-gradient-to-b from-slate-900 to-slate-900 px-4 py-8 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h1 
          variants={fadeIn}
          custom={0}
          className="text-3xl md:text-4xl font-serif font-semibold text-gray-50 mb-2 tracking-tight"
        >
          Create a New Post
        </motion.h1>
        
        <motion.p
          variants={fadeIn}
          custom={1}
          className="text-gray-500 mb-8"
        >
          Share your thoughts, ideas, and expertise with the world
        </motion.p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Cover Image Upload */}
          <motion.div 
            variants={fadeIn}
            custom={2}
            className="bg-gradient-to-br from-black to-black p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden"
          >
            {cover ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative"
              >
                <img 
                  src={cover.url} 
                  alt="Cover preview" 
                  className="w-full h-48 object-cover rounded-xl" 
                />
                <button 
                  type="button"
                  onClick={() => setCover("")}
                  className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 bg-blue-50 p-3 rounded-full">
                  <Image className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-400 mb-2">Add a Cover Image</h3>
                <p className="text-gray-500 text-sm max-w-md mb-4">A compelling image can increase engagement with your post</p>
                <Upload type="image" setProgress={setProgress} setData={setCover}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Select Cover Image
                  </motion.button>
                </Upload>
              </div>
            )}
          </motion.div>

          {/* Title Input */}
          <motion.div
            variants={fadeIn}
            custom={3}
          >
            <input
              className="w-full text-3xl md:text-4xl font-serif font-semibold bg-transparent outline-none border-b-2 border-slate-200 focus:border-blue-500 transition-colors py-3 px-1"
              type="text"
              placeholder="Enter your title here..."
              name="title"
            />
          </motion.div>

          {/* Category Selection */}
          <motion.div 
            variants={fadeIn}
            custom={4}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-xl bg-slate-700 text-white shadow-sm border border-slate-100"
          >
            <label className="text-gray-50 font-medium min-w-[100px]">Category:</label>
            <select
              name="category"
              className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 w-full sm:w-auto"
            >
              <option value="general">General</option>
              <option value="Web-Design">Web Design</option>
              <option value="Development">Development</option>
              <option value="seo">Search Engines</option>
              <option value="Marketing">Marketing</option>
            </select>
          </motion.div>

          {/* Description Textarea */}
          <motion.div
            variants={fadeIn}
            custom={5}
          >
            <textarea
              className="w-full p-4 bg-white rounded-xl shadow-sm border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] text-gray-700"
              name="desc"
              placeholder="Write a compelling description for your post..."
            />
          </motion.div>

          {/* Editor Section */}
          <motion.div 
            variants={fadeIn}
            custom={6}
            className="relative"
          >
            {showTip && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 right-0 bg-blue-50 text-blue-700 p-3 rounded-lg text-sm flex items-center gap-2 shadow-sm"
              >
                <span>💡 Pro tip: Use the buttons on the left to add media to your post</span>
                <button onClick={() => setShowTip(false)} className="text-blue-500 hover:text-blue-700">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            
            <div className="flex gap-4">
              {/* Upload Tools */}
              <motion.div 
                className="flex flex-col gap-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Upload type="image" setProgress={setProgress} setData={setImg}>
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "#E1F5FE" }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors shadow-sm"
                  >
                    <Image className="w-5 h-5" />
                  </motion.button>
                </Upload>
                <Upload type="video" setProgress={setProgress} setData={setVideo}>
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "#E1F5FE" }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors shadow-sm"
                  >
                    <Video className="w-5 h-5" />
                  </motion.button>
                </Upload>
              </motion.div>

              {/* Rich Text Editor */}
              <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <ReactQuill
                  theme="snow"
                  className="h-[450px] bg-white text-black"
                  value={value}
                  onChange={setValue}
                  readOnly={0 < progress && progress < 100}
                />
              </div>
            </div>
          </motion.div>

          {/* Footer Section */}
          <motion.div 
            variants={fadeIn}
            custom={7}
            className="flex items-center justify-between pt-6"
          >
            <div className="space-y-2">
              {progress > 0 && progress < 100 && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "16rem" }}
                  className="bg-gray-200 rounded-full h-2 w-64"
                >
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  ></motion.div>
                </motion.div>
              )}
              {mutation.isError && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  {mutation.error.message}
                </motion.span>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={mutation.isPending || (0 < progress && progress < 100)}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
                hover:bg-blue-700 transition-colors duration-200
                disabled:bg-blue-300 disabled:cursor-not-allowed
                flex items-center gap-2 shadow-md shadow-blue-100"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Publish Post
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default Write;


// import "react-quill-new/dist/quill.snow.css";
// import ReactQuill from "react-quill-new";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import Upload from "../components/Upload";

// const Write = () => {
//   const navigate = useNavigate();
//   const { isLoaded, isSignedIn } = useUser();
//   const [value, setValue] = useState("");
//   const [cover, setCover] = useState("");
//   const [img, setImg] = useState("");
//   const [video, setVideo] = useState("");
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
//   }, [img]);

//   useEffect(() => {
//     video &&
//       setValue(
//         (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
//       );
//   }, [video]);

//   const { getToken } = useAuth();
//   const mutation = useMutation({
//     mutationFn: async (newPost) => {
//       const token = await getToken();
//       return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     },
//     onSuccess: (res) => {
//       toast.success("Post has been created");
//       navigate(`/${res.data.slug}`);
//     },
//   });

//   if (!isLoaded) {
//     return <div className="flex items-center justify-center h-screen text-gray-600">Loading...</div>;
//   }
//   if (isLoaded && !isSignedIn) {
//     return <div className="flex items-center justify-center h-screen text-lg text-red-600">You should login!</div>;
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     const data = {
//       img: cover.filePath || "",
//       title: formData.get("title"),
//       category: formData.get("category"),
//       desc: formData.get("desc"),
//       content: value,
//     };

//     console.log(data);
//     mutation.mutate(data);
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]  px-4 py-8 md:px-8">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-serif font-semibold text-gray-800 mb-8">Create a New Post</h1>
        
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Cover Image Upload */}
//           <div className=" p-6 rounded-xl shadow-sm ">
//             <Upload type="image" setProgress={setProgress} setData={setCover}>
//               <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2">
//                 <span>📸</span>
//                 Add Cover Image
//               </button>
//             </Upload>
//           </div>

//           {/* Title Input */}
//           <input
//             className="w-full text-4xl font-semibold bg-transparent outline-none border-b-2 border-gray-200 focus:border-blue-500 transition-colors py-2 px-1"
//             type="text"
//             placeholder="Enter your title here..."
//             name="title"
//           />

//           {/* Category Selection */}
//           <div className="flex items-center gap-4  p-6 rounded-xl shadow-sm ">
//             <label className="text-gray-700 font-medium">Category:</label>
//             <select
//               name="category"
//               className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//             >
//               <option value="general">General</option>
//               <option value="Web-Design">Web Design</option>
//               <option value="Development">Development</option>
//               <option value="seo">Search Engines</option>
//               <option value="Marketing">Marketing</option>
//             </select>
//           </div>

//           {/* Description Textarea */}
//           <textarea
//             className="w-full p-4 bg-white rounded-xl shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] text-gray-700"
//             name="desc"
//             placeholder="Write a compelling description for your post..."
//           />

//           {/* Editor Section */}
//           <div className="flex gap-4">
//             {/* Upload Tools */}
//             <div className="flex flex-col gap-4">
//               <Upload type="image" setProgress={setProgress} setData={setImg}>
//                 <button className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
//                   🏙️
//                 </button>
//               </Upload>
//               <Upload type="video" setProgress={setProgress} setData={setVideo}>
//                 <button className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
//                   🎥
//                 </button>
//               </Upload>
//             </div>

//             {/* Rich Text Editor */}
//             <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//               <ReactQuill
//                 theme="snow"
//                 className="h-[400px] bg-white"
//                 value={value}
//                 onChange={setValue}
//                 readOnly={0 < progress && progress < 100}
//               />
//             </div>
//           </div>

//           {/* Footer Section */}
//           <div className="flex items-center justify-between pt-6">
//             <div className="space-y-2">
//               {progress > 0 && progress < 100 && (
//                 <div className="w-64 bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                     style={{ width: `${progress}%` }}
//                   ></div>
//                 </div>
//               )}
//               {mutation.isError && (
//                 <span className="text-red-500 text-sm">{mutation.error.message}</span>
//               )}
//             </div>
            
//             <button
//               disabled={mutation.isPending || (0 < progress && progress < 100)}
//               className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
//                 hover:bg-blue-700 transition-colors duration-200
//                 disabled:bg-blue-300 disabled:cursor-not-allowed
//                 flex items-center gap-2"
//             >
//               {mutation.isPending ? (
//                 <>
//                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                   </svg>
//                   Publishing...
//                 </>
//               ) : (
//                 "Publish Post"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Write;