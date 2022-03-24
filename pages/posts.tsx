import { Flex, Heading } from "@chakra-ui/react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import PostCard from "../components/Elements/PostCard/PostCard";
import { getPosts } from "../lib/posts";
import { Post } from "../types";

export const getStaticProps: GetStaticProps = async () => {
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
      <Heading as="h1" size="xl" textAlign="center" my="2">
        Posts
      </Heading>
      <Flex justifyContent="center" flexWrap="wrap">
        {posts.map((post: Post) => (
          <PostCard key={post.name} post={post} />
        ))}
      </Flex>
    </>
  );
};

export default Posts;
