import type { NextApiRequest, NextApiResponse } from "next";
import { postsData } from "../../../mock/posts";
import { Post } from "../../../types/post";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post>
) {
  const posts = postsData;
  const { id } = req.query;
  const post = posts.filter((post) => post.id === id)[0];

  res.status(200).json(post);
}
