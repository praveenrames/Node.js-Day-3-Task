import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Database/db.Config.js';
import studentsrouter from './Router/Student.router.js'
import mentorsrouter from './Router/Mentor.router.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Server');
})

app.use('/api/students', studentsrouter);

app.use('/api/mentors', mentorsrouter);

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})