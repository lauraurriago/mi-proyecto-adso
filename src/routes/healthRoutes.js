import { Router } from 'express';
import { getHealthStatus } from '../controllers/healthController.js';

const router = Router();

/**
 * @route   GET /api/health
 * @desc    Diagnóstico de salud dual y latencias
 * @access  Público / Telemetría
 */
router.get('/', getHealthStatus);

export default router;