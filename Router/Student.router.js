import express from 'express';
import { changeMentor, createStudent, getAllStudents, getPreviousMentors } from '../Controllers/Student.Controller.js';

const router = express.Router();

router.post('/create/student', createStudent);

router.get('/get/student', getAllStudents);

router.put('/changeMentor/:id', changeMentor);

router.get('/getPrivousMentors/:id', getPreviousMentors);
export default router;


