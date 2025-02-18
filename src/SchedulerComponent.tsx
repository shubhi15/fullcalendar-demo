import React, { useEffect, useRef, useState } from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./event-utils";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { people } from "./constants";
import { generateEvents, getResources } from "./utils";
import Legend from "./Legend/Legend";
import EventCount from "./EventCount/EventCount";
import TimelineView from "./ResourceTimeline";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import adaptivePlugin from "@fullcalendar/adaptive";

const SchedulerComponent: React.FC = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [date, setDate] = useState(new Date());

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [eventCount, setEventCount] = useState(100);
  const [events, setEvents] = useState<any[]>(generateEvents(100));

  const calendar = useRef(null);

  const [visiblePeople, setVisiblePeople] = useState<string[]>(
    people.map((p) => p.name)
  );

  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

  // Function to handle date change from React Calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const calendarApi = calendar.current.getApi();
    calendarApi.gotoDate(date); // Navigate to selected date
  };

  useEffect(() => {
    // Simulate real-time updates every 10 seconds
    const interval = setInterval(() => {
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // Add 1 hour
      const newEvent = {
        id: String(new Date().getTime()),
        title: "New Event at " + new Date().toLocaleTimeString(),
        start: now, // Today
        end: oneHourLater, // Today
        allDay: false,
      };

      // Append new event to current events
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }, 10000);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  useEffect(() => {
    const events = generateEvents(eventCount);
    const datasrc = events?.filter((event) =>
      visiblePeople.includes(event.resourceId)
    );
    measureRenderTime(() => setEvents(datasrc), "On filtering");
  }, [visiblePeople]);

  useEffect(() => {
    const events = generateEvents(eventCount); // Generate 10,000 events
    measureRenderTime(() => setEvents(events), "On Event Count Update");
  }, [eventCount]);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        resourceId: people[0].name,
      });
    }
    setCreateDialogOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const measureRenderTime = (updateFunction, opType) => {
    const start = performance.now();

    updateFunction(); // Asynchronous state update

    // Wait for state update to reflect in the DOM
    requestAnimationFrame(() => {
      setTimeout(() => {
        const end = performance.now();
        console.log(`Updated ${opType} in: ${end - start} ms`);
      }, 0);
    });
  };

  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="w-1/4 p-4 bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4">Select a Date</h2>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="rounded-lg shadow-sm p-2"
          />
        </div>
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <Legend
          visiblePeople={visiblePeople}
          togglePersonVisibility={togglePersonVisibility}
        />

        <EventCount
          eventCount={eventCount}
          handleEventCountChange={handleEventCountChange}
        />
        {createDialogOpen && <button>Create</button>}
      </div>
    );
  };
  const togglePersonVisibility = (personId: string) => {
    setVisiblePeople((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId]
    );
  };

  const handleEventCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value, 10);
    setEventCount(count);
  };

  return (
    <div className="demo-app">
      {renderSidebar()}

      <div className="demo-app-main">
        <FullCalendar
          ref={calendar}
          initialDate={selectedDate}
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          // plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          // headerToolbar={{
          //   left: "prev,next today",
          //   center: "title",
          //   right: "dayGridMonth,timeGridWeek,timeGridDay",
          // }}
          plugins={[
            adaptivePlugin,
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            resourceTimelinePlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right:
              "dayGridMonth,timeGridWeek,timeGridDay,resourceTimelineDay,dayGridYear",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          views={{
            dayGridMonth: { dayMaxEventRows: 1 }, // Limit month view
            dayGridWeek: { dayMaxEventRows: 1 }, // Limit week view
            timeGridDay: { dayMaxEventRows: 1 }, // Limit day view
            dayGridYear: { dayMaxEventRows: 1 }, // Limit year view
          }}
          buttonText={{
            today: "Current Day", // Rename "Today" button
            prev: "Back", // Rename "Prev" button
            next: "Forward", // Rename "Next" button
            resourceTimelineDay: "Timeline View",
            timeGridDay: "Day",
            timeGridWeek: "Week",
            dayGridMonth: "Month",
           
          }}
          weekends={weekendsVisible}
          events={events}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          dayMaxEvents={true} // Limit events in month view
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          resources={getResources()}
        />
      </div>
    </div>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start!, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

export default SchedulerComponent;
