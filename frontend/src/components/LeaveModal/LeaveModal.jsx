import React, { useState } from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import { createLeave } from '../../api/leaveRequest';
import './LeaveModal.css'

function LeaveModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const [formData, setFormData] = useState({
    studentName: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await createLeave(formData);
    setModalOpened(false)
  };

  return (
    <Modal
      overlaycolor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlaycpacity={0.55}
      overlayclur={3}
      size='55%'
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >

      <form className='authForm infoForm'
        onSubmit={handleSubmit}>
        <h3>Leave Request</h3>
        <div>
          <input
            type="text"
            id="studentName"
            className='infoInput'
            name="studentName"
            placeholder='Student Name'
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            className='infoInput'
            name="startDate"
            placeholder='Start Date'
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            className='infoInput'
            name="endDate"
            placeholder='End Date'
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <textarea
            className='infoInput'
            id="reason"
            name="reason"
            placeholder='Describe your reason of leave'
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='button btn submitBtn'>Submit</button>
      </form>
    </Modal>
  );
}

export default LeaveModal;