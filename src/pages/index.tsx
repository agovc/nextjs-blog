import type { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import Layout, { siteTitle } from "../components/layout";
import { serialize } from "next-mdx-remote/serialize";
import { compareDesc, parseISO } from "date-fns";
import type { MetaData, Post } from "~/types";
import Date from "../components/date";
import Image from "next/image";
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
      <section className="py-8 bg-_lightgray">
        <div className="container mx-auto mt-12">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <li className="list-none group relative m-4" key={index}>
                <Link
                  href={`/posts/${post.meta.id}`}
                  className="flex flex-col gap-2 p-4 h-full hover-underline-container"
                >
                  <div className="w-full bg-orange-400">
                    <Image
                      width={600}
                      height={600}
                      alt={post.meta.title}
                      src={post.meta.image}
                    />
                  </div>
                  <div className="text-_black p-4 flex-1 flex flex-col justify-between">
                    <div className="font-semibold">
                      <span className="animated-multi-underline">
                        {post.meta.title}
                      </span>
                    </div>
                    <div className="font-light mt-auto">
                      <Date dateString={post.meta.date} />
                    </div>
                  </div>
                </Link>
                <div
                  className="absolute top-0 left-0 right-0 h-px bg-_gray"
                  style={{ top: "1rem" }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-px bg-_gray"
                  style={{ bottom: "1rem" }}
                ></div>
                <div
                  className="absolute top-0 bottom-0 left-0 w-px bg-_gray"
                  style={{ left: "1rem" }}
                ></div>
                <div
                  className="absolute top-0 bottom-0 right-0 w-px bg-_gray"
                  style={{ right: "1rem" }}
                ></div>
              </li>
            ))}
          </ul>
        </div>
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

  posts.sort((a, b) =>
    compareDesc(parseISO(a.meta.date), parseISO(b.meta.date)),
  );

  return {
    props: {
      posts,
    },
  };
}
