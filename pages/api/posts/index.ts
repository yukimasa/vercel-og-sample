import type { NextApiRequest, NextApiResponse } from "next";
import { postsData } from "../../../mock/posts";
import { Post } from "../../../types/post";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  res.status(200).json(postsData);
}
