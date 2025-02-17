import { people } from "../constants";
import "./Legend.css";

const Legend = ({visiblePeople, togglePersonVisibility}) => {
    return (
        <div className="legend">
            <h4>Legend</h4>
            {people.map(person => (
          <label key={person.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="checkbox"
              checked={visiblePeople.includes(person.name)}
              onChange={() => togglePersonVisibility(person.name)}
            />
            <span
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: person.color,
                display: 'inline-block',
              }}
            />
            {person.name}
          </label>
        ))}
          
        </div>
    );
};
export default Legend;
