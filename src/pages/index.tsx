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
        <ul className="grid grid-cols-3">
          {posts.map((post, index) => (
                <Link href={`/posts/${post.meta.id}`}>
            <li className="list-none text font-bold text-center md:text-left bg-white rounded-2xl p-8  hover:bg-slate-200 h-[350px]" key={index}>
              <>
                  <span className="text-2xl">
                    {post.meta.title}
                  </span>
                <br />
                <small className="text-gray-600">
                  <Date dateString={post.meta.date} />
                </small>
              </>
            </li>
                </Link>
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
