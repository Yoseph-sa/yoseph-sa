// sanityClient.js
import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "qimxivre", // sanity.json ya sanity.io se lein
  dataset: "production", // ya aapka custom dataset name
  apiVersion: "2023-01-01", // koi recent date
  useCdn: true, // true = fast & cached, false = always fresh
});
