import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { Post } from "../../types/post";
import { ParsedUrlQuery } from "querystring";

type Params = {
  id: string;
} & ParsedUrlQuery;

type DataType = { post: Post };

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Posts({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/api/og?title=${post.title}`}
        />
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
        <p>id: {post.id}</p>
        <h2>{post.title}</h2>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (): Promise<
  GetStaticPathsResult<Params>
> => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`).then(
    (data) => data.json()
  );

  const paths = data.map((post: Post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<DataType, Params> = async ({
  params,
}) => {
  if (!params?.id) {
    throw new Error("Error: ID not found");
  }

  const post = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${params.id}`
  ).then((data) => data.json());

  return {
    props: { post },
  };
};
