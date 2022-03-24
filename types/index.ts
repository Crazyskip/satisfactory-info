type Image = {
  url: string;
  width: number;
  height: number;
};

export type Post = {
  id: string;
  name: string;
  category: string;
  image: Image;
  description?: string;
  createdAt: string;
};
