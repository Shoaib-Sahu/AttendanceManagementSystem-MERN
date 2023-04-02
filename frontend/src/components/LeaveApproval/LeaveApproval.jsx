import React, { useState } from 'react';
import { leaveApproval } from '../../api/leaveRequest';
import './LeaveApproval.css'

const LeaveRequestApproval = ({ leaveRequest }) => {
    const [status, setStatus] = useState(leaveRequest.status);
    const [newStatus, setNewStatus] = useState(status);

    const handleStatusChange = async (e) => {
        e.preventDefault();
        const { data } = await leaveApproval(leaveRequest._id, { status: newStatus })
        setStatus(data.status)
    };
    
    return (
        <div className='leave-ap'>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                <tr >
                    <>
                        <td>{leaveRequest?.studentName}</td>
                        <td>{leaveRequest?.startDate.toString().substring(0, 10)}</td>
                        <td>{leaveRequest?.endDate.toString().substring(0, 10)}</td>
                        <td>{leaveRequest?.reason}</td>
                        <td>
                            <form >
                                <select
                                    value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </form>
                        </td>
                        <td>
                            <button type="submit"
                                onClick={handleStatusChange}
                                className='button btn'>Update Status</button>
                        </td>
                    </>
                </tr>
            </table>
        </div>
    );
};

export default LeaveRequestApproval;