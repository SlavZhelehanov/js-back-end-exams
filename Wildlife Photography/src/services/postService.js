import Post from "../models/Post.js";

export default {
    createPost(postData) {
        for (const key in postData) postData[key] = postData[key].trim();

       return  Post.create(postData);
    },
    getAllPosts() {
        return Post.find({}, "image keyword title description");
    },
    getOnePost(params) {
        return Post.findOne(params);
    },
    voteUp(postId, newFanId) {
        return Post.findByIdAndUpdate(postId, { $push: { votes: newFanId }, $inc: { rating: 1 } }, { new: true });
    },
    voteDown(postId, newHaterId) {
        return Post.findByIdAndUpdate(postId, { $push: { votes: newHaterId }, $inc: { rating: -1 } }, { new: true });
    },
    updateOnePost(_id, author, post, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != post[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;
        return Post.findOneAndUpdate({ _id, author }, options, { new: true, runValidators: true });
    }
};