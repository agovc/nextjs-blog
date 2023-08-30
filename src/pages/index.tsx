import type { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import Layout, { siteTitle } from "../components/layout";
import { serialize } from "next-mdx-remote/serialize";
import type { MetaData, Post } from "~/types";
import Date from "../components/date";
import fs from "fs/promises";
import Head from "next/head";
import Link from "next/link";
import path from "path";

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <ul>
          {posts.map((post, index) => (
            <li className="mb-4 list-none text-center md:text-left" key={index}>
              <Link
                className="relative inline-block group"
                href={`/posts/${post.meta.id}`}
              >
                <span className="text-lg relative z-10 underline hover:decoration-2">
                  {post.meta.title}
                </span>
                <span className="absolute inset-0 bg-yellow-200 h-4 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform translate-y-2 ease-out duration-500"></span>
              </Link>
              <br />
              <small className="text-gray-600">
                <Date dateString={post.meta.date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{
    posts: Post[];
  }>
> {
  const dirPath = path.join(process.cwd(), "src", "content", "posts");
  const files = await fs.readdir(dirPath);

  const posts = await Promise.all(
    files.map(async (fileName: string) => {
      const postFile = await fs.readFile(
        path.join(process.cwd(), "src", "content", "posts", fileName),
        "utf-8",
      );
      const mdxSource = await serialize(postFile, {
        parseFrontmatter: true,
      });

      return {
        meta: mdxSource.frontmatter as MetaData,
        content: mdxSource,
      };
    }),
  );

  return {
    props: {
      posts,
    },
  };
}
