import express from 'express';
import { assignMentorToStudent, assignStudentsToMentor, createMentor, getAllMentors, getAllMentorsWithStudents } from '../Controllers/Mentor.Controller.js';
import { changeMentor } from '../Controllers/Student.Controller.js';

const router = express.Router();

router.post('/create/mentor', createMentor);

router.get('/get/allmentor', getAllMentors);

router.put('/assignStudentToMentor/:id', assignStudentsToMentor);

router.put('/assignMentorToStudent/:id', assignMentorToStudent);

router.get('/getAllMentorsWithStudents', getAllMentorsWithStudents);



export default router;