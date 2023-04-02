import React, { useEffect, useState } from 'react';
import { getLeaves } from '../../api/leaveRequest';
import './LeaveList.css'

function LeaveRequestList() {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            const { data } = await getLeaves();
            setLeaveRequests(data)
        };
        fetchLeaveRequests();
    }, []);

    return (
        <div className='leaveList'>
            <h2>Leave Requests</h2>
            <table>
                <tr>
                    <th>Sr.no.</th>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
                {leaveRequests.map((request, i) => {
                    return (
                        <tr key={request._id}>
                            <>
                                <td>{i + 1}</td>
                                <td>{request.studentName}</td>
                                <td>{request.startDate.toString().substring(0, 10)}</td>
                                <td>{request.endDate.toString().substring(0, 10)}</td>
                                <td>{request.reason}</td>
                                <td>{request.status}</td>
                            </>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}

export default LeaveRequestList;