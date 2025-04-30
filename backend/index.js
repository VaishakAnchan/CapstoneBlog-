import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";
import webhookRouter from "./routes/webhook.route.js";
import mongoose from "mongoose";
import { connectDB } from "./db/Db.conn.js";
import { clerkMiddleware } from '@clerk/express';
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors(process.env.CLIENT_URL))
app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);
app.use(express.json());
const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// try {
//   mongoose.connect(URI);
//   console.log(`Connected to MongoDb `);
// } catch (error) {
//   console.log("error:", error);
// }

// app.get("/test", (req,res)=>{
//     res.status(200).send("it works proprely now after the changes ")
// })

// app.get("/auth-state",(req,res)=>{
//   const authState = req.auth;
//   res.json(authState);
// });

// app.get("/protect",(req,res)=>{
//   const {UserId} = req.auth;
//   if(!UserId){
//     return res.status(401).json("not authenticated")
//   }
//   res.status(200).json("content")
// });

// app.get("/protect2", requireAuth(), (req,res)=>{

//   res.status(200).json("content")
// });

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`listing to port ${PORT}`);
});
