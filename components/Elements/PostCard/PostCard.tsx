import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../../types";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => (
  <Box
    boxShadow="md"
    rounded="lg"
    borderWidth="1px"
    color="orange.400"
    _hover={{ boxShadow: "xl" }}
    m="2"
    position="relative"
  >
    <Link href={`/posts/${post.id}`}>
      <a>
        <Box h="180px" w={["270px", "290px"]} position="relative" rounded="lg">
          <Image
            className="card-img"
            src={post.image.url}
            layout="fill"
            objectFit="cover"
            alt={post.name}
          />
        </Box>
        <Box p="4" h="100px" w="full" bg="gray.700" roundedBottom="lg">
          <Heading as="h4" fontSize="2xl" fontWeight="semibold" mb="2">
            {post.name}
          </Heading>
          <Text color="gray.200">{post.category}</Text>
        </Box>
      </a>
    </Link>
  </Box>
);

export default PostCard;
