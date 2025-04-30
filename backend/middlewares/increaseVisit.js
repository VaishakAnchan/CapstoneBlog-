import post from "../models/post.model.js";

const increaseVisit = async (req, res, next) => {
  const slug = req.params.slug;
  await post.findOneAndUpdate({ slug }, { $inc: { visit: 10 } });
  next();
};

export default increaseVisit;
