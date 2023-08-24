import type { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import Layout, { siteTitle } from "../components/layout";
import { serialize } from "next-mdx-remote/serialize";
import utilStyles from "../styles/utils.module.css";
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
      <section className={utilStyles.headingMd}>
        <p>
          Hello and welcome! This blog is where I unpack my learning adventures,
          particularly within the world of frontend.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map((post, index) => (
            <li key={index} className={utilStyles.listItem}>
              <Link href={`/posts/${post.meta.id}`}>{post.meta.title}</Link>
              <br />
              <small className={utilStyles.lightText}>
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
