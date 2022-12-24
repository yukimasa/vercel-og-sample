import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Post } from "../../types/post";

type DataType = {
  contents: Post[];
};

export default function Posts({ contents }: DataType) {
  return (
    <>
      <Head>
        <title>posts</title>
        <meta name="description" content="記事一覧" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6rem",
        }}
      >
        <ul>
          {contents.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <li>{post.title}</li>
            </Link>
          ))}
        </ul>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<DataType> = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`).then(
    (data) => data.json()
  );

  return {
    props: {
      contents: data,
    },
  };
};
