import type { GetStaticPropsResult, GetStaticPaths } from "next";
import utilStyles from "../../styles/utils.module.css";
import { serialize } from "next-mdx-remote/serialize";
import type { MetaData, Post, Params } from "types";
import type { InferGetStaticPropsType } from "next";
import { getAllPostIds } from "../../lib/posts";
import Layout from "../../components/layout";
import { MDXRemote } from "next-mdx-remote";
import Date from "../../components/date";
import fs from "fs/promises";
import Head from "next/head";
import path from "path";

export default function Post({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head>
        <title>{post.meta.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.meta.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.meta.date} />
        </div>
        <MDXRemote {...post.content} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: Params): Promise<
  GetStaticPropsResult<{
    post: Post;
  }>
> {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fullPath = path.join(postsDirectory, `${params?.id}.md`);

  try {
    const fileContent = await fs.readFile(fullPath, "utf8");
    const mdxSource = await serialize(fileContent, {
      parseFrontmatter: true,
    });

    const post: Post = {
      meta: mdxSource.frontmatter as MetaData,
      content: mdxSource,
    };

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      notFound: true,
    };
  }
}
