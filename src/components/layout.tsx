import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export const siteTitle = "Santi's Blog";

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
    <div className="container mx-auto mt-12">
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
            <div className="mt-8 md:mt-36 grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="md:col-span-1 md:flex md:flex-col md:order-2 flex justify-center md:justify-start items-center">
                <div className="relative h-40 w-40">
                  <Image
                    priority
                    src="/images/profile-pic.jpg"
                    className="rounded-full"
                    fill={true}
                    alt={siteTitle}
                  />
                </div>
              </div>
              <div className="mt-4 md:mt-0 col-span-3 flex flex-col md:order-1 text-center md:text-left md:items-start justify-center">
                <h1
                  className={`gradient-text gradient-text-animate text-4xl md:text-5xl lg:text-6xl  whitespace-normal`}
                >
                  {"Hi, I'm Santi!"}
                  <br />
                  {"I am a web eng"}
                </h1>
                <p className="my-6">
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
          </>
        ) : (
          <></>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <Link href="/">
          <button className="mt-8 mb-12">
            <p className="relative px-6 py-3 font-bold text-black group">
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
              <span className="relative">← Back to home</span>
            </p>
          </button>
        </Link>
      )}
    </div>
  );
}
