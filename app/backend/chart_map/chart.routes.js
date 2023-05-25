import {Router} from "express";
import {processMapData} from './chart.controller.js'

const router = Router();
router.get('/', processMapData);
export {router};