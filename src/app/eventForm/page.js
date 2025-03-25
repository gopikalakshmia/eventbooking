"use client";

import { useState } from "react";

export default function EventsPage() {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log({ eventName, description });
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventName, description }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Event created successfully!");
      setEventName("");
      setDescription("");
    } else {
      setMessage(data.error || "Failed to create event.");
    }
  };

  return (
    <div>
      <h1>Event List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create Event</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
