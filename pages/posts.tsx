import { Box, Heading, Text } from "@chakra-ui/react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import NextImage from "next/image";
import { getPosts } from "../lib/posts";

type Image = {
  url: string;
  width: number;
  height: number;
};

export interface Post {
  name: string;
  category: string;
  image: Image;
  description?: string;
  createdAt: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
};

const Posts: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(posts);
  return (
    <>
      <Heading as="h1" size="xl">
        Posts
      </Heading>
      {posts.map((post: Post) => (
        <Box w="50%" key={post.name}>
          <Text fontSize="2xl" key={post.name}>
            {post.name} - {post.category}
          </Text>
          <NextImage
            src={"https:" + post.image.url}
            height={post.image.height}
            width={post.image.width}
            alt={post.name}
            layout="responsive"
          />
        </Box>
      ))}
    </>
  );
};

export default Posts;
