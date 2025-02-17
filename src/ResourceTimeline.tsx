import React from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

const TimelineView = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Timeline View</h2>
      <FullCalendar
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        plugins={[resourceTimelinePlugin]}
        initialView="resourceTimelineWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth",
        }}
        resources={[
          { id: "a", title: "Resource A" },
          { id: "b", title: "Resource B" },
        ]}
        events={[
          {
            id: "1",
            resourceId: "a",
            title: "Event 1",
            start: "2024-02-17T10:00:00",
            end: "2024-02-18T12:00:00",
          },
          {
            id: "2",
            resourceId: "b",
            title: "Event 2",
            start: "2024-02-17T14:00:00",
            end: "2024-02-18T16:00:00",
          },
        ]}
        height="auto"
      />
    </div>
  );
};

export default TimelineView;
