import React, { useEffect, useState } from 'react';
import { GetSingleLeaves } from '../../api/leaveRequest';

function SingleLeave() {
    const [leaveRequest, setLeaveRequest] = useState([]);
    

    useEffect(() => {
        const fetchLeaveRequest = async () => {
            const { data } = await GetSingleLeaves();
            setLeaveRequest(data)
        };
        fetchLeaveRequest();
    }, []);

    return (
        <div className='leaveList'>
            <h2>Leave Request</h2>
            <table>
                <tr>
                    <th>Sr.no.</th>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
                {leaveRequest.map((request, i) => {
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

export default SingleLeave;