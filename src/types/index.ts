import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Params = {
  params: {
    id: string;
  };
};

export type MetaData = {
  date: string;
  title: string;
  id: string;
};

export type Post = {
  meta: MetaData;
  content: MDXRemoteSerializeResult;
};
