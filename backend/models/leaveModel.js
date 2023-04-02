import mongoose from 'mongoose';

const leaveRequestSchema = new mongoose.Schema({
    studentName: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    reason: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
});

const Leave = mongoose.model('LeaveRequest', leaveRequestSchema);
export default Leave;