import { Inter } from "@next/font/google";
// import styles from './page.module.css'
import Pricing from "../../components/Pricing";
import Feature from "../../components/Feature";
import Testimonial from "../../components/Testimonial";
import Email from "../../components/Email";
import BottomButtons from "../../components/BottomButtons";
import Hero from "../../components/Hero";
import RichText from "../../components/RichText";


const inter = Inter({ subsets: ["latin"] });

export default async function Pages({ params }) {
  const { page } = params;
  const data = await getPage(page);
  //console.log(data);


  const pageInfo = data.data[0];
  console.log(pageInfo.attributes);

  return (
    <main>
      {pageInfo.attributes.contentSections.map((pageData) => (
        <div key={pageData.id}>
          {pageData.__component === "sections.pricing" && (
            <Pricing content={pageData} />
          )}

          {pageData.__component === "sections.hero" && (
            <Hero content={pageData} />
          )}

          {pageData.__component === "sections.feature-columns-group" && (
            <Feature content={pageData} />
          )}

          {pageData.__component === "sections.testimonials-group" && (
            <Testimonial content={pageData} />
          )}

          {pageData.__component === "sections.lead-form" && (
            <Email content={pageData} />
          )}

          {pageData.__component === "sections.bottom-actions" && (
            <BottomButtons content={pageData} />
          )}

          {pageData.__component === "sections.rich-text" && (
            <RichText content={pageData} />
          )}
        </div>
      ))}
    </main>
  );
}

async function getPage(pageSlug) {
  const res = await fetch(
    `http://localhost:1337/api/pages?filters[slug][$eq]=${pageSlug}&populate[contentSections][populate][plans][populate]=%2A`
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
