import { Post } from "../types";

const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Parses data from contentful response into Post format
const parsePostData = (post: any): Post => {
  const parsedPost: Post = {
    id: post.sys.id,
    name: post.fields.name,
    category: post.fields.category.fields.name,
    image: {
      url: `https:${post.fields.image.fields.file.url}`,
      width: post.fields.image.fields.file.details.image.width,
      height: post.fields.image.fields.file.details.image.height,
    },
    createdAt: post.sys.createdAt,
  };

  if (post.fields.description) parsedPost.description = post.fields.description;

  return parsedPost;
};

// Fetches all posts from contentful space and parses data
export const getPosts = async (): Promise<Post[]> => {
  const response = await client.getEntries({
    content_type: "post",
  });

  const posts = response.items.map((item: any) => parsePostData(item));

  return posts;
};

// Fetches post by id and parses data
export const getPostById = async (id: string): Promise<Post> => {
  const response = await client.getEntry(id);

  const post = parsePostData(response);

  return post;
};

// Fetches all posts and returns array of all ids
export const getAllPostIds = async (): Promise<string[]> => {
  const response = await client.getEntries({
    content_type: "post",
  });

  return response.items.map((item: any) => item.sys.id);
};

// Fetches all posts with featured tag
export const getAllFeaturedPosts = async (): Promise<Post[]> => {
  const response = await client.getEntries({
    "metadata.tags.sys.id[all]": "featured",
  });

  const posts = response.items.map((item: any) => parsePostData(item));

  return posts;
};

// Fetches 6 most recent posts
export const getAllRecentPosts = async (): Promise<Post[]> => {
  const response = await client.getEntries({
    content_type: "post",
    order: "-sys.createdAt",
    limit: 6,
  });

  const posts = response.items.map((item: any) => parsePostData(item));

  return posts;
};
