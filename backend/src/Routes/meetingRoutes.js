import express from 'express'
import { createMeetingId } from '../controllers/meetingController.js';

const router = express.Router();

router.post("/create",createMeetingId)

export default router;