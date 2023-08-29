import type { GetStaticPropsResult, GetStaticPaths } from "next";
import { serialize } from "next-mdx-remote/serialize";
import type { MetaData, Post, Params } from "~/types";
import type { InferGetStaticPropsType } from "next";
import { getAllPostIds } from "../../lib/posts";
import Layout from "../../components/layout";
import { MDXRemote } from "next-mdx-remote";
import Date from "../../components/date";
import Image from "next/image";
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
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8  mt-8 md:mt-24">
          <Image
            priority
            src="/images/profile-pic.jpg"
            className="rounded-full h-20 w-20 mr-4 border-neutral-100 border-4 mb-4 md:mb-0"
            height={70}
            width={70}
            alt="Avatar"
          />

          <div>
            <h1 className="text-4xl gradient-text font-extrabold">
              {post.meta.title}
            </h1>
            <div className="text-gray-600">
              <Date dateString={post.meta.date} />
            </div>
          </div>
        </div>

        <div className="mdx-content">
          <MDXRemote {...post.content} />
        </div>
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
  const postsDirectory = path.join(process.cwd(), "src", "content", "posts");
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
