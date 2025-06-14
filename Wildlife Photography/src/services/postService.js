import Post from "../models/Post.js";

export default {
    createPost(postData) {
        for (const key in postData) postData[key] = postData[key].trim();

       return  Post.create(postData);
    },
    getAllPosts() {
        return Post.find({}, "image keyword title description");
    }
};