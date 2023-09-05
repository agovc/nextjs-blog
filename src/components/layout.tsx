import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export const siteTitle = "Santi's dev blog";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  const contactHref = new URL("mailto:hey@santicorona.dev");
  contactHref.searchParams.set("subject", "Hello!");

  return (
    <div className="absolute mx-24 mt-12 bg-black p-0.5 space-y-0.5">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteTitle} />
        <meta name="og:title" content={siteTitle} />
        <link
          rel="preload"
          href="Mona-Sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <header>
        {home ? (
          <>
            <div className="relative grid grid-cols-1 md:grid-cols-3 h-[450px] space-x-0.5">
              <div className="bg-white rounded-2xl col-span-2 p-8 flex items-center">
                <div>
                <h1
                  className={`inline-block gradient-text gradient-text-animate text-4xl md:text-4xl lg:text-8xl  whitespace-pre`}
                >
                  Hey there!
                  {/* {"Hi, I'm Santi!"} */}
                  <br />
                  {/* {"I am a web eng"} */}
                </h1>
                <p className="my-6 text-lg">
                  {"I'm a SF-based software engineer with a strong focus on "}
                  <span className="font-bold">React</span>{" "}
                  {" and a keen interest in "}
                  <span className="font-bold">AI</span>.{" "}
                  {"Join me as we explore the ever-changing world of "}
                  <span className="font-bold">frontend</span>
                  {" development. Let's connect on "}
                  <a
                    href="https://www.linkedin.com/in/agovc/"
                    target="_blank"
                    className="underline hover:decoration-2 hover:text-blue-950"
                  >
                    LinkedIn
                  </a>
                  {" or say hello at "}
                  <a
                    href={contactHref.toString()}
                    target="_blank"
                    className="underline hover:decoration-2 hover:text-blue-950"
                  >
                    hey@santicorona.dev
                  </a>
                  {"!"}
                </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl">
                <div className="relative h-full">
                  <Image
                    priority
                    src="/images/profile.jpg"
                    className="object-cover h-full w-full rounded-2xl"
                    fill={true}
                    alt={siteTitle}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="hover:underline mb-8">
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
