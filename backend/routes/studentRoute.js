import express from 'express';
import {
    createStudent,
    deleteStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    getOneAttendance,
    enterAttendance,
} from '../controllers/studentController.js';
const router = express.Router();

router.post("/create", createStudent);
router.get("/:id", getStudent);
router.get("/", getAllStudents);
router.put("/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);
router.put('/attendance/enter/:id', enterAttendance);
router.get("/attendance/:id", getOneAttendance);

export default router