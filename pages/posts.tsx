import { Flex, Heading, Input } from "@chakra-ui/react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { useState } from "react";
import PostCard from "../components/Elements/PostCard/PostCard";
import { getPosts } from "../lib/posts";
import { InputEvent, Post } from "../types";

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};

const Posts: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (event: InputEvent) =>
    setSearchValue(event.target.value);

  return (
    <>
      <Flex position="relative" w="full" flexDirection="column" mb="2">
        <Heading as="h1" size="xl" textAlign="center" mt="2">
          Posts
        </Heading>
        <Input
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search"
          position={["unset", "unset", "absolute"]}
          mx="auto"
          my="2"
          w={["full", "380px", "300px"]}
          right="0"
          top="3px"
        />
      </Flex>
      <Flex justifyContent="center" flexWrap="wrap">
        {posts
          .filter((post: Post) =>
            post.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((post: Post) => (
            <PostCard key={post.name} post={post} />
          ))}
      </Flex>
    </>
  );
};

export default Posts;
