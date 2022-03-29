import { Flex, Heading } from "@chakra-ui/react";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import PostCard from "../components/Elements/PostCard/PostCard";
import { getAllFeaturedPosts, getAllRecentPosts } from "../lib/posts";
import { Post } from "../types";

export const getStaticProps: GetStaticProps = async () => {
  const featuredPosts = await getAllFeaturedPosts();
  const recentPosts = await getAllRecentPosts();
  return {
    props: {
      featuredPosts,
      recentPosts,
    },
    revalidate: 60,
  };
};

const Home: NextPage = ({
  featuredPosts,
  recentPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Satisfactory Info</title>
        <meta
          name="description"
          content="Factory plans and load balancers for satisfactory"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h2" size="lg" mt="6">
        Most Recent
      </Heading>
      <Flex overflowX="scroll">
        {recentPosts.map((post: Post) => (
          <PostCard key={post.name} post={post} />
        ))}
      </Flex>
      <Heading as="h2" size="lg" mt="6">
        Featured
      </Heading>
      <Flex overflowX="scroll">
        {featuredPosts.map((post: Post) => (
          <PostCard key={post.name} post={post} />
        ))}
      </Flex>
    </>
  );
};

export default Home;
