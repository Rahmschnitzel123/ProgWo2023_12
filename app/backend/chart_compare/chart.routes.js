import { processCompareData } from './chart.controller.js'
import {Router} from "express";

const router = Router()
router.get('/', processCompareData)
export { router };
