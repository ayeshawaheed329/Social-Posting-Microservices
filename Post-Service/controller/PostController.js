import prisma from "../config/db.config.js";
import axios from "axios";

class PostController {
  static async getPosts(req, res) {
    try {
      const posts = await prisma.post.findMany({});

      // Method # 01
      // let postWithUsers = await Promise.all(
      //   posts.map( async( post ) => {
      //     const res = await axios.get(
      //       `http://localhost:5001/api/getUser/${post.user_id}`
      //     );
      //     console.log("res ",res);
      //     return {
      //       ...res?.data,
      //       ...post
      //     }
      //   })
      // );


      // Method # 02
      const uderIds = posts?.map( post => post?.user_id);
      const response = await axios.post(
          `http://localhost:5001/api/getUsers`, uderIds
      );
      const users = response?.data?.users;
      let postWithUsers = posts?.map( post => {
        const user = users?.find( user => user.id === post?.user_id);
        return {
          ...post,
          user:{
            ...user
          },
        }
      });
      return res.json({ users: postWithUsers });

    } catch (error) {
      return res.status(500).json({ message: "something went wrong" });
    }
  }
  static async createPost(req, res) {
    try {
      const user = req?.user;
      const post = await prisma.post.create({
        data: {
          user_id: user?.id,
          title: req?.body?.title,
          content: req?.body?.content,
        },
      });
      return res.json({ message: "Post created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong" });
    }
  }
}

export default PostController;
