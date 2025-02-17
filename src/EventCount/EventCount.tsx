


const EventCount = ({eventCount, handleEventCountChange}) => {
    return (
        <div className="event-count">
          <h4>Event Count</h4>
        <select
          id="event-count"
          value={eventCount}
          onChange={handleEventCountChange}
        >
          <option value={100}>100</option>
          <option value={500}>500</option>
          <option value={1000}>1000</option>
        </select>
    </div>
    );
};
export default EventCount;
