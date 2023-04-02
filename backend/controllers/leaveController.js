import leaveRequestModel from "../models/leaveModel.js";

// Create a new leave request for a student
export const createLeave = async (req, res) => {
    const { studentName, startDate, endDate, reason, status } = req.body;
    try {
        const leaveRequest = new leaveRequestModel({
            studentName,
            startDate,
            endDate,
            reason,
            status
        });
        const savedLeaveRequest = await leaveRequest.save();
        res.status(201).json(savedLeaveRequest);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single leave request
export const getOneLeave = async (req, res) => {
    const id = req.params.id
    try {
        const leave = await leaveRequestModel.findById(id);

        if (!leave) {
            return res.status(404).json({ message: "Leave not found" });
        }
        res.status(200).json(leave)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create an API endpoint for retrieving leave requests:
export const getLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await leaveRequestModel.find();
        if (!leaveRequests) {
            return res.status(404).json({ message: "There are no leave requests" })
        };

        res.status(200).json(leaveRequests);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create an API endpoint for approving or rejecting leave requests:
export const leaveApproval = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const leaveRequest = await leaveRequestModel.findById(id);
        if (!leaveRequest) {
            return res.status(404).send('Leave request not found');
        };

        leaveRequest.status = status;
        const updatedLeaveRequest = await leaveRequest.save();
        res.status(200).json(updatedLeaveRequest);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a leave request
export const deleteLeave = async (req, res) => {
    try {
        let leave = await leaveRequestModel.findById(req.params.id);
        if (!leave) {
            return res.status(404).json({ message: "Leave not found" });
        }

        leave = await leaveRequestModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Leave request deleted successfully.', leave });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};