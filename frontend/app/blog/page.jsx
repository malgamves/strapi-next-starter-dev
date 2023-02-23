import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default async function Blog() {
  const data = await getData();

  return (
    <main className={styles.main}>
      <section className="dark:bg-black dark:text-gray-100">
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <a
            rel="noopener noreferrer"
            href="#"
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900"
          >
            <Image
              src="https://source.unsplash.com/random/480x360"
              alt=""
              width="0"
              height="0"
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
            />
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                Noster tincidunt reprimique ad pro
              </h3>
              <span className="text-xs dark:text-gray-400">
                February 19, 2021
              </span>
              <p>
                Ei delenit sensibus liberavisse pri. Quod suscipit no nam. Est
                in graece fuisset, eos affert putent doctus id.
              </p>
            </div>
          </a>
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((article) => (
              <a
                rel="noopener noreferrer"
                href={`blog/${article.attributes.slug}`}
                key={article.id}
                className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900"
              >
                <Image
                  alt="presentation"
                  width="0"
                  height="0"
                  className="object-cover w-full rounded h-44 dark:bg-gray-500"
                  src="https://source.unsplash.com/random/480x360?1"
                />
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                    {article.attributes.title}
                  </h3>
                  <span className="text-xs dark:text-gray-400">
                    January 21, 2021
                  </span>
                  <p>{article.attributes.description}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-900 dark:text-gray-400"
            >
              Load more posts...
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

async function getData() {
  const res = await fetch("http://localhost:1337/api/articles");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
