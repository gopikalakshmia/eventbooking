import Image from "next/image";
import * as contentful from "contentful";

let client=contentful.createClient({
  space:process.env.CONTENTFUL_SPACE_ID,
  accessToken:process.env.CONTENTFUL_ACCESS_TOKEN,

})
export default  async function Home() {

  const data = await getEventData();

  if (data) {
    console.log("Event Name:", data.eventName);
    console.log("Event Description:", data.eventDescription.content.map((item)=>item.content[0].value));
   
  } else {
    console.log("No event data found.");
  }

  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <h1>{data.eventName} Event</h1>
    <p>{data.eventDescription.content.map((item)=>item.content[0].value)}</p>
    </div>
  );
}
export async function getEventData(){

  const response=await client.getEntry(process.env.ENTRY_ID);
  console.log(response);
  if(response)
    return {
      eventName: response.fields.eventName,
eventDescription:response.fields.eventDescription
    };
}