import Mentor from "../Models/Mentor.schema.js";
import Student from "../Models/Student.schema.js";

// create Mentor 

export const createMentor = async (req, res) => {

    try {
        const mentor = new Mentor (req.body);
        await mentor.save();
        res.status(201).json({ message: "Mentor added successfully", data:mentor});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// get all mentors

export const getAllMentors = async (req, res) => {

    try {
        const mentor = await Mentor.find();
        res.status(200).json({ message: "All Mentors", data: mentor});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

           // Assigning Student To Mentor 

export const assignStudentsToMentor = async (req, res) => {
    try {
      const mentorId = req.params.id;
      const { students } = req.body;
  
      console.log("Mentor ID:", mentorId);
      console.log("Students:", students);
  
      // Check if the students are already assigned
      const mentor = await Mentor.findById(mentorId);
      if (!mentor) {
        return res.status(404).send("Mentor details not found");
      }
  
      console.log("Current Students:", mentor.students);
  
      // Update the mentor's students list
      const result = await Mentor.updateOne(
        { _id: mentorId },
        { $addToSet: { students: { $each: students } } }
      );
  
      console.log("Update Result:", result);
  
      // Ensure the update was successful
      if (result.modifiedCount === 0) {
        return res
          .status(404)
          .send("Mentor details not found or no changes made");
      }
  
      // Fetch the updated mentor with populated student details
      const updatedMentor = await Mentor.findById(mentorId).populate(
        "students",
        "studentName studentEmail"
      );
      res.status(200).json({
        message: "Student Assigned To Mentor Successfully",
        data: updatedMentor,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send("Internal Server Error In Assigning students To Mentor");
    }
  };

               // Assign Mentor to Student 

  export const assignMentorToStudent = async (req, res) => {

    try {
        const studentId = req.params.id;
        const { mentorId } = req.body;

        const student = await Student.findById(studentId);
        if(!student) {
            return res.status(404).json({ message: "Student details not found"});
        }

        student.mentor = mentorId;
        await student.save();

        const mentor = await Mentor.findById(mentorId);
        if(!mentor.students.includes(studentId)) {
            mentor.students.push(studentId);
            await mentor.save();
        }
        res.status(200).json({ message: "Mentor Assigned To Student Successfully", data: student});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error"});
    }
  }

               // Get All Mentors With Students

  export const getAllMentorsWithStudents = async (req, res) => {

    try {
        const mentors = await Mentor.find().populate(
            "students",
            "studentName studentEmail"
        );
        const mentorDetails = mentors.map((ele) => ({
            _id : ele._id,
            Mentor_Name : ele.mentorName,
            Mentor_Email : ele.mentorEmail,
            students : ele.students,
        }))
        res.status(200).json({ message: "List of Mentors With Students", result:mentorDetails})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error"});
    }
  }
  

