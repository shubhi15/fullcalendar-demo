import { people } from "./constants";

export const generateEvents = (eventCount: number) => {
    const events = [];
    const startDate = new Date(2025, 1, 1);
    const endDate = new Date(2025, 5, 28);
    

    for (let i = 0; i < eventCount; i++) {
        const personIndex = i % people.length;
        const person = people[personIndex];

        const randomDay = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

        const hour = Math.floor(Math.random() * 10) + 8;
        const duration = Math.floor(Math.random() * 2) + 1;

        const start = new Date(randomDay);
        start.setHours(hour, 0, 0);

        const end = new Date(start);
        end.setHours(start.getHours() + duration);

        const eventType = Math.random() > 0.5 ? "service" : "non-service";

        events.push({
            id: i + 1,
            start: start,
            end: end,
            title: `Event ${i + 1}`,
            backgroundColor: person.color, // Assign background color from person
            personId: person.name,
            type: eventType,
            customAttr: 'New Attr'
        });
    }
    return events;
};


