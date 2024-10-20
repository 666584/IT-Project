// EventsSection.js
import React from "react";
import './EventsSection.css';

const EventsSection = () => {
  const events = [
    { 
      title: "2025 UN Ocean Conference", 
      date: "9 - 13 June 2025", 
      image: require("./Images/event1.png"),
      url: "https://sdgs.un.org/conferences/ocean2025"  
    },
    { 
      title: "10th Multi-stakeholder Forum on Science, Technology and Innovation for the Sustainable Development Goals", 
      date: "7 - 8 May 2025", 
      image: require("./Images/event2.png"),
      url: "https://sdgs.un.org/tfm/STIForum2025"
    },
    { 
      title: "International Workshop “Strengthening National Capacities for Enhancing Micro-, Small and Medium-sized Enterprises’ (MSMEs) Resilience for accelerating the implementation of the 2030 Agenda and SDGs in developing countries", 
      date: "11 - 13 Nov 2024", 
      image: require("./Images/event3.png"),
      url: "https://sdgs.un.org/events/international-workshop-strengthening-national-capacities-enhancing-micro-small-and-medium" 
    },
    { 
      title: "Asia-Pacific GSDR launch and workshop (New Delhi, India)", 
      date: "22 - 24 Oct 2024", 
      image: require("./Images/event4.png"),
      url: "https://sdgs.un.org/gsdr/newdelhiworkshop"
    }
  ];

  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="events-section">
      <div className="section-header">
        <h3>Upcoming Events</h3>
        <button className="view-all-button" onClick={() => handleRedirect("https://sdgs.un.org/events")}>View all</button>
      </div>
      <div className="event-list">
        {events.map((event, index) => (
          <div className="event-card" key={index} onClick={() => handleRedirect(event.url)}>
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
