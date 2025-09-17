import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  // Static list of events
  const [events] = useState([
    {
      title: "Orientation Day",
      start: new Date(2025, 0, 27), // January 27, 2025
      end: new Date(2025, 0, 27),
    },
    {
      title: "Midterm Exam",
      start: new Date(2025, 1, 15), // February 15, 2025
      end: new Date(2025, 1, 15),
    },
    {
      title: "Project Submission",
      start: new Date(2025, 2, 10), // March 10, 2025
      end: new Date(2025, 2, 10),
    },
  ]);

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
