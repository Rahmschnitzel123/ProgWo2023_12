import { processCountyData } from './chart.controller.js'
import {Router} from "express";

const router = Router();
router.get('/', processCountyData);
export { router };