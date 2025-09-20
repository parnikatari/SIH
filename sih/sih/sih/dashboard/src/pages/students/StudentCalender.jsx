import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function StudentCalendar() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // wait for user to load
    const allEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    const studentEvents = allEvents.filter(
      (event) => event.students && event.students.includes(user.email)
    );
    setEvents(studentEvents);
    setLoading(false);
  }, [user]);

  if (loading || !user) return <p>Loading...</p>;

  const eventsForDate = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="calendar-container">
      <h1>Hello, {user.name}</h1>
      <h2>Class Calendar</h2>

      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={({ date }) => {
          const dayEvents = events.filter((event) => {
            const eventDate = new Date(event.date);
            return (
              eventDate.getFullYear() === date.getFullYear() &&
              eventDate.getMonth() === date.getMonth() &&
              eventDate.getDate() === date.getDate()
            );
          });
          return dayEvents.length ? (
            <div className="event-dot" title={`${dayEvents.length} event(s)`}></div>
          ) : null;
        }}
      />

      <div className="events-list">
        <h3>Events on {selectedDate.toDateString()}</h3>
        {eventsForDate.length === 0 ? (
          <p>No events for this day.</p>
        ) : (
          <ul>
            {eventsForDate.map((event, idx) => (
              <li key={idx}>
                <strong>{event.title}</strong> - {event.subject} <br />
                {event.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .calendar-container {
          max-width: 900px;
          margin: 30px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h1, h2 {
          text-align: center;
        }

        .react-calendar {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .event-dot {
          height: 6px;
          width: 6px;
          background: #ff9800;
          border-radius: 50%;
          margin: 2px auto 0;
        }

        .events-list {
          margin-top: 20px;
          background: #fff;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .events-list ul {
          list-style: none;
          padding-left: 0;
        }

        .events-list li {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
