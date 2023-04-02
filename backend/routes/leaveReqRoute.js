import express from 'express';
import {
    createLeave,
    getLeaveRequests,
    leaveApproval,
    getOneLeave,
    deleteLeave
} from '../controllers/leaveController.js';
const router = express.Router();

router.post('/create', createLeave);
router.get("/:id", getOneLeave);
router.get('/', getLeaveRequests);
router.put('/:id', leaveApproval);
router.delete("/:id",deleteLeave);

export default router;