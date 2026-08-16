import { createClient } from "@sanity/client";

export default createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  apiVersion: "2024-01-01", // use a UTC date string
  useCdn: true, // `false` if you want to ensure fresh data
});
