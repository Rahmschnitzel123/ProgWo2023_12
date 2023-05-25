import express from 'express';
import { router as mapRouter } from './backend/chart_map/chart.routes.js';
import {loadAllData} from "./backend/loadData.js";

const app = express();

app.use(express.static('frontend'));
app.use(express.json());
app.use('/api/mapData', mapRouter);
/*
app.use('/api/countyData', countyRouter);
*/
loadAllData();
app.listen(3001, () => {
    console.log('Server listens to http://localhost:3001');
});
