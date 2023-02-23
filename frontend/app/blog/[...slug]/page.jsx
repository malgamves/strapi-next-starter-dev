import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default async function BlogPost({ params }) {
  const { slug } = params;
  const data = await getPost(slug);

  const article = data.data[0];

  return (
    <main>
      <div className="max-w-2xl px-6 py-16 mx-auto space-y-12">
        <article className="space-y-8 dark:bg-black dark:text-gray-50">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
              {article.attributes.title}
            </h1>
            <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
              <div className="flex items-center md:space-x-2">
                <Image
                  src="https://source.unsplash.com/75x75/?portrait"
                  alt=""
                  width="0"
                  height="0"
                  className="w-4 h-4 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                />
                <p className="text-sm">
                  {article.attributes.author.data.attributes.name} • July 19th,
                  2021
                </p>
              </div>
              <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                4 min read • 1,570 views
              </p>
            </div>
          </div>
          <div className="dark:text-gray-100">
            <p>{article.attributes.blocks[0].body}</p>
          </div>
        </article>
        <div>
          <div className="flex flex-wrap py-6 space-x-2 border-t border-dashed dark:border-gray-400">
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-3 py-1 rounded-sm hover:underline dark:bg-violet-400 dark:text-gray-900"
            >
              #MambaUI
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-3 py-1 rounded-sm hover:underline dark:bg-violet-400 dark:text-gray-900"
            >
              #TailwindCSS
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-3 py-1 rounded-sm hover:underline dark:bg-violet-400 dark:text-gray-900"
            >
              #Angular
            </a>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Related posts</h4>
            <ul className="ml-4 space-y-1 list-disc">
              <li>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="hover:underline"
                >
                  Nunc id magna mollis
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="hover:underline"
                >
                  Duis molestie, neque eget pretium lobortis
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="hover:underline"
                >
                  Mauris nec urna volutpat, aliquam lectus sit amet
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

// export async function generateStaticParams() {
//   const posts = await getPosts();

//   return posts.data.map((post) => ({
//     slug: post.attributes.slug,
//   }));
// }

async function getPost(slug) {
  const res = await fetch(
    `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
