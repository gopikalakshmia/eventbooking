import { createClient } from "contentful";

const SPACE_ID=process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN=process.env.CONTENTFUL_ACCESS_TOKEN;

export const contentfulClient=createClient({
  space:SPACE_ID,
  accessToken:ACCESS_TOKEN,
    
});

export const getEvents=async()=>{
    try {
        const entries =await contentfulClient.getEntries({ content_type: "event" });
        console.log(entries);
        return entries.items.map((item) => ({
          id: item.sys.id,
          eventName: item.fields.eventName,
          description: item.fields.description,
        }));
      } catch (error) {
        console.error("Error fetching events:", error);
        return [];
      }
}