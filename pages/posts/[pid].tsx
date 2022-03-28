import { Box, Heading, Text } from "@chakra-ui/react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import { getAllPostIds, getPostById } from "../../lib/posts";

export const getStaticPaths = async () => {
  const postIds = await getAllPostIds();
  const paths = postIds.map((pid: string) => ({ params: { pid } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const post = await getPostById(params.pid);
  return {
    props: {
      post,
    },
  };
};

const Posts: NextPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Heading as="h1" size="xl" textAlign="center" my="2">
        Post
      </Heading>
      <Box w={["100%", "100%", "100%", "100%", "90%"]} mx="auto">
        <Box maxW={(666 / post.image.height) * post.image.width} mx="auto">
          <Image
            src={post.image.url}
            alt={post.name}
            width={post.image.width}
            height={post.image.height}
            layout="responsive"
          />
        </Box>
        <Heading as="h2" size="lg" mt="4" mb="2">
          {post.name}
        </Heading>
        <Text color="gray.600">{post.category}</Text>
        {post.description ? <Text mt="6">{post.description}</Text> : null}
      </Box>
    </>
  );
};

export default Posts;
