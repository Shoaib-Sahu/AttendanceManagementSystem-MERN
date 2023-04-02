import React, { useEffect, useState } from 'react'
import { getLeaves } from '../../api/leaveRequest';
import LeaveRequestApproval from '../LeaveApproval/LeaveApproval';
import LeaveRequestList from '../LeaveList/LeaveList';

const Leaves = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            const { data } = await getLeaves();
            setLeaveRequests(data)
        };
        fetchLeaveRequests();
    }, []);

    return (
        <div className='Leaves'>
            <LeaveRequestList />
            <h2 className='leaveApproval'>For Leave Approval</h2>
            {
                leaveRequests.map((request, id) => {
                    return (
                        <>
                            <LeaveRequestApproval
                                leaveRequest={request}
                            />
                        </>
                    )
                })
            }
        </div>
    )
}

export default Leaves
