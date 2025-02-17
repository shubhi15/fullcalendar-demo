// // src/mocks/handlers.ts
// import { rest } from 'msw';
// import { generateEvents } from '../utils';

// // Mock data for full data load
// const fullData = generateEvents(300);

// // Mock data for lazy loading (fetch events based on date range)
// const lazyData = (startDate: string, endDate: string) => {
//     return Array.from({ length: 100 }, (_, index) => ({
//         id: index + 1,
//         start_date: new Date(startDate).toISOString(),
//         end_date: new Date(endDate).toISOString(),
//         text: `Lazy Loaded Event ${index + 1}`,
//     }));
// };

// // Define the mock API handlers
// export const handlers = [
//     // Mock full data load
//     rest.get('path/to/full-data', (req, res, ctx) => {
//         return res(ctx.status(200), ctx.json(fullData));
//     }),

//     // Mock lazy data load (based on date range)
//     rest.get('path/to/lazy-data', (req, res, ctx) => {
//         const startDate = req.url.searchParams.get('start') || '';
//         const endDate = req.url.searchParams.get('end') || '';
//         const events = lazyData(startDate, endDate);
//         return res(ctx.status(200), ctx.json(events));
//     }),
// ];
