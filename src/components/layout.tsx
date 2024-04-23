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
    <div>
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
          <div className="flex justify-center items-center h-96 relative">
            <div className="container mx-auto mt-2">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <li className="hidden lg:block list-none group relative p-4 m-4 lg:col-span-1 h-[283px] overflow-hidden">
                  <div className="bg-orange-400 flex justify-center items-center">
                    <Image
                      className="p-4"
                      style={{ objectFit: "cover" }}
                      fill
                      alt="Profile Picture"
                      src="/images/profile-pic.jpg"
                    />
                  </div>

                  <div
                    className="absolute top-0 left-0 right-0 h-px bg-gray-300"
                    style={{ top: "1rem" }}
                  ></div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"
                    style={{ bottom: "1rem" }}
                  ></div>
                  <div
                    className="absolute top-0 bottom-0 left-0 w-px bg-gray-300"
                    style={{ left: "1rem" }}
                  ></div>
                  <div
                    className="absolute top-0 bottom-0 right-0 w-px bg-gray-300"
                    style={{ right: "1rem" }}
                  ></div>
                </li>

                <li className="list-none p-4 m-4 md:col-span-3 lg:col-span-2">
                  <h1 className="font-bold text-_darkgray text-4xl md:text-5xl lg:text-6xl  whitespace-normal">
                    {"Hi, I'm Santi!"}
                  </h1>

                  <p className="my-6 text-_darkgray">
                    {"I'm a SF-based software engineer specializing in"}
                    <span className="font-semibold">{" frontend "}</span>
                    {"development with a keen interest in"}
                    <span className="font-semibold">{" AI."}</span>
                    {
                      " With expertise in creating engaging user interfaces, I'm eager to explore the dynamic landscape of web technologies. Connect with me on "
                    }
                    <a
                      href="https://www.linkedin.com/in/santicd/"
                      target="_blank"
                      className="underline text-black hover:decoration-2 hover:text-blue-950"
                    >
                      LinkedIn
                    </a>
                    {", or drop a hello at "}
                    <a
                      href={contactHref.toString()}
                      target="_blank"
                      className="underline text-black hover:decoration-2 hover:text-blue-950"
                    >
                      hey@santicorona.dev
                    </a>
                    {"!"}
                  </p>
                </li>
              </ul>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-_gray"></div>
          </div>
        ) : (
          <></>
        )}
      </header>
      <main className={`${!home ? "container mx-auto mt-2" : ""}`}>
        {children}
      </main>
      {!home && (
        <div className="container mx-auto mt-2">
          <Link href="/">
            <button className="mt-8 mb-12">
              <p className="relative px-6 py-3 font-bold text-black group">
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
                <span className="relative">← Back to home</span>
              </p>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
