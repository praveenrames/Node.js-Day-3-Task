import Mentor from "../Models/Mentor.schema.js";
import Student from "../Models/Student.schema.js";

             // create student

export const createStudent = async (req, res) => {
    try {
        const newStudent = new Student (req.body);
        await newStudent.save();
        res.status(201).json({ message: "Student created successfully", data:newStudent });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

            // get all students

export const getAllStudents = async (req, res) => {
    try {
        const student = await Student.find();
        res.status(200).json({ message: "Students Details", data: student })
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

          // Get Previous Mentors for a student

export const getPreviousMentors = async (req, res) => {

    try {
        const studentId = req.params.id;

        const student = await Student.findById(studentId).populate('previousMentor.mentor', 'mentorName mentorEmail');
        if(!student) {
            return res.status(404).json({ message: "Student not found "})
        }

        res.status(200).json({ message: "Previous Mentors for Student", previousMentor: student.previousMentor});

    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

            // Change Mentor for a Particular student

            export const changeMentor = async (req, res) => {
                try {
                  const studentId = req.params.id;
                  const { newMentorId } = req.body;
              
                  const student = await Student.findById(studentId);
                  if (!student) {
                    return res.status(404).json({ message: "Student not found" });
                  }
              
                  const oldMentorId = student.mentor;
                  if (oldMentorId) {
                    student.previousMentor.push({
                      mentor: oldMentorId,
                      assignedDate: new Date()
                    });
                  }
              
                  student.mentor = newMentorId;
                  await student.save();
              
                  // Remove student from old mentor's list
                  if (oldMentorId) {
                    await Mentor.findByIdAndUpdate(oldMentorId, { $pull: { students: studentId } });
                  }
              
                  // Add student to new mentor's list
                  await Mentor.findByIdAndUpdate(newMentorId, { $push: { students: studentId } });
              
                  res.status(200).json({ message: "Mentor changed successfully", student });
                } catch (error) {
                  console.log(error);
                  res.status(500).json({ message: "Internal Server Error In Change Mentor for Particular Student" });
                }
              };

