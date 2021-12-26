import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: process.env.SANITY_PROJECT_ID, // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  apiVersion: "v1", // use a UTC date string
  useCdn: true, // `false` if you want to ensure fresh data
});
