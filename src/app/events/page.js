import { getEvents } from "@/lib/contentful";

const EventsPage = async() => {
  const events = await getEvents();
  return (
    <div>
      <ul>
        {events.map((item) => (
          <li
            key={item.id}
          >{` Event Name: ${item.eventName}  Event Description: ${item.description}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;