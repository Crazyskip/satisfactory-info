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

  const items = response.items.map((item: any) => {
    const newItem: Post = {
      name: item.fields.name,
      category: item.fields.category.fields.name,
      image: {
        url: `https:${item.fields.image.fields.file.url}`,
        width: item.fields.image.fields.file.details.image.width,
        height: item.fields.image.fields.file.details.image.height,
      },
      createdAt: item.sys.createdAt,
    };

    if (item.fields.description) newItem.description = item.fields.description;
    return newItem;
  });

  return items;
};
