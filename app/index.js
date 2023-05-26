import express from 'express';
import { router as mapRouter } from './backend/chart_map/chart.routes.js';
import { router as yearRouter } from './backend/chart_year/chart.routes.js';
import { router as countyRouter } from "./backend/chart_county/chart.routes.js";
import { router as compareRouter } from "./backend/chart_compare/chart.routes.js";
import {loadAllData} from "./backend/loadData.js";

const app = express();

app.use(express.static('frontend'));
app.use(express.json());
app.use('/api/mapData', mapRouter);
app.use('/api/yearData', yearRouter);
app.use('/api/countyData', countyRouter);
app.use('/api/compareData', compareRouter);

loadAllData();
app.listen(3001, () => {
    console.log('Server listens to http://localhost:3001');
});
