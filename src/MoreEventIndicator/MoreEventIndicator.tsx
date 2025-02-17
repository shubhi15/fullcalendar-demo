const EventTemplate = (eventData) => {
  return (
    <div className="custom-event">
      <img
        className="event-icon"
        src="https://cdn-icons-png.flaticon.com/128/747/747376.png"
        alt="icon"
      />
      <div>
        <strong>${eventData.label}</strong>
        <br />
        <small>
          ${eventData.dateStart.toLocaleTimeString()} - $
          {eventData.dateEnd.toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
};
export default EventTemplate;
