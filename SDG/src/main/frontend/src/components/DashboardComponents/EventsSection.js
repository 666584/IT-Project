// EventsSection.js
import React from "react";
import './EventsSection.css';

const EventsSection = () => {
  const events = [
    { title: "Creative Minds Workshop", date: "September 20, 2024", image: require("./Images/event1.png") },
    { title: "Wellness Retreat", date: "December 10, 2024", image: require("./Images/event2.png") },
    { title: "Digital Innovation Summit", date: "September 20, 2024", image: require("./Images/event3.png") },
    { title: "Sustainable Living Expo", date: "September 20, 2024", image: require("./Images/event4.png") }
  ];

  return (
    <div className="events-section">
      <div className="section-header">
        <h3>Upcoming Events</h3>
        <button className="view-all-button">View all</button>
      </div>
      <div className="event-list">
        {events.map((event, index) => (
          <div className="event-card" key={index}>
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-details">
              <p className="event-title">{event.title}</p>
              <p className="event-date">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
