import { createClient } from "contentful-management";
import { NextResponse } from "next/server";
const contentfulClient=createClient({
    accessToken:process.env.CONTENTFUL_MANAGEMENT_TOKEN
})
const SPACE_ID=process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = "master"; 


export async function POST(req){
    try{
        const body=await req.json();
        const { eventName, description } = body;

    if (!eventName || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const space = await contentfulClient.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    const entry= await environment.createEntry("event", {
      fields: {
        eventName: { "en-US": eventName },
        description: { "en-US": description },
      },

    })
    await entry.publish();
    return NextResponse.json({ message: "Event created successfully", entry }, { status: 201 });
    }
    catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
      }
}