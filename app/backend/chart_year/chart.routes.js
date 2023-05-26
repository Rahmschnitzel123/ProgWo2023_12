import { processYearData } from './chart.controller.js'
import {Router} from "express";

const router = Router()
router.get('/', processYearData);
export { router };