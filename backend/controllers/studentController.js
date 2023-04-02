import userModel from "../models/UserModel.js";

// Create A Student
export const createStudent = async (req, res) => {
    const { rollNo } = req.body;
    try {
        const oldUser = await userModel.findOne({ rollNo });
        if (oldUser) {
            return res.status(400).json({ error: "A student with this roll number is already added" });
        };

        const user = await userModel.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get A Student
export const getStudent = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await userModel.findById(_id).select("-password");
        // Checking if Student exists 
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        };
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Students
export const getAllStudents = async (req, res) => {
    try {
        let users = await userModel.find();
        users = users.map((user) => {
            // fetching password out of the student details
            const { password, ...otherDetails } = user._doc
            return otherDetails
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Update A Student
export const updateStudent = async (req, res) => {
    const id = req.params.id;
    const { _id, password } = req.body;
    try {
        if (_id !== id) {
            return res.status(403).json({ error: "Access Denied! you can only update your own profile" });
        };

        // If user wants to update his/her password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password, salt);
        };

        const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            return res
                .status(404)
                .json({ error: "User does not exists" });
        };
        // JWT Authentication
        // const token = jwt.sign(
        //     { username: user.username, id: user._id },
        //     process.env.SECRET_KEY,
        //     { expiresIn: "7d" },
        // );
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Delete A Student
export const deleteStudent = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
    try {
        if (_id !== id) {
            return res.status(403).json({ error: "Access Denied! you can only Delete your own profile" });
        };

        let user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: "student not found" });
        };

        user = await userModel.findByIdAndDelete(id);
        res.status(200).json({ message: "student deleted successfully", user });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
};


// To mark attendance as present/absent
export const enterAttendance = async (req, res) => {
    const _id = req.params.id;
    const { date, studentId, present, student } = req.body;
    try {
        let user = await userModel.findById(_id);
        if (!user) {
            res.status(404).json({ message: 'Student not found' });
            return;
        };

        const attendance = {
            date,
            studentId,
            present,
            student
        };

        user.attendance.push(attendance);
        await user.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Get A Single Student Attendance
export const getOneAttendance = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findById(id).select("-password");
        // const attendance = user.attendance
        res.status(200).json(
            user.attendance.sort((a, b) => {
                return a.date - b.date;
            }),
        );
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// To delete Attendance
export const deleteAttendance = async (req, res) => {
    const id = req.params.id;
    try {
        let attendance = await userModel.findById(id);
        if (!attendance) {
            return res.status(404).json({ message: "Attendance not found" });
        }

        attendance = await userModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Attendance deleted successfully.', attendance });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}