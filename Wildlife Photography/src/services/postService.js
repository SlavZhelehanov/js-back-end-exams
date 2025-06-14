import Post from "../models/Post.js";

export default {
    createPost(postData) {
        let messages = [];

        for (const key in postData) postData[key] = postData[key].trim();

       return  Post.create(postData);
    }
};