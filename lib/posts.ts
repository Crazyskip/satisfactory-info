import { Post } from "../types";

const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetches all posts from contentful space and parses data
export const getPosts = async (): Promise<Post[]> => {
  const response = await client.getEntries({
    content_type: "post",
  });

  const posts = response.items.map((item: any) => {
    const newPost: Post = {
      id: item.sys.id,
      name: item.fields.name,
      category: item.fields.category.fields.name,
      image: {
        url: `https:${item.fields.image.fields.file.url}`,
        width: item.fields.image.fields.file.details.image.width,
        height: item.fields.image.fields.file.details.image.height,
      },
      createdAt: item.sys.createdAt,
    };

    if (item.fields.description) newPost.description = item.fields.description;
    return newPost;
  });

  return posts;
};

// Fetches post by id and parses data
export const getPostById = async (id: string): Promise<Post> => {
  const response = await client.getEntry(id);
  const post: Post = {
    id: response.sys.id,
    name: response.fields.name,
    category: response.fields.category.fields.name,
    image: {
      url: `https:${response.fields.image.fields.file.url}`,
      width: response.fields.image.fields.file.details.image.width,
      height: response.fields.image.fields.file.details.image.height,
    },
    createdAt: response.sys.createdAt,
  };

  if (response.fields.description)
    post.description = response.fields.description;

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

  const posts = response.items.map((item: any) => {
    const newPost: Post = {
      id: item.sys.id,
      name: item.fields.name,
      category: item.fields.category.fields.name,
      image: {
        url: `https:${item.fields.image.fields.file.url}`,
        width: item.fields.image.fields.file.details.image.width,
        height: item.fields.image.fields.file.details.image.height,
      },
      createdAt: item.sys.createdAt,
    };

    if (item.fields.description) newPost.description = item.fields.description;
    return newPost;
  });

  return posts;
};

export const getAllRecentPosts = async (): Promise<Post[]> => {
  const response = await client.getEntries({
    content_type: "post",
    order: "-sys.createdAt",
    limit: 6,
  });

  const posts = response.items.map((item: any) => {
    const newPost: Post = {
      id: item.sys.id,
      name: item.fields.name,
      category: item.fields.category.fields.name,
      image: {
        url: `https:${item.fields.image.fields.file.url}`,
        width: item.fields.image.fields.file.details.image.width,
        height: item.fields.image.fields.file.details.image.height,
      },
      createdAt: item.sys.createdAt,
    };

    if (item.fields.description) newPost.description = item.fields.description;
    return newPost;
  });

  return posts;
};
