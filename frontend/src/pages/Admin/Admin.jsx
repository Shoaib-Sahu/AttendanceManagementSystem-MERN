import React from 'react'
import AddStudent from '../../components/AddStudent/AddStudent'
import Leaves from '../../components/Leaves/Leaves'
import Navbar from '../../components/Navbar/Navbar'
import AllStudents from '../../components/AllStudents/AllStudents'

const Admin = () => {
  return (
    <div className='Admin'>
      <Navbar />
      <AddStudent />
      <AllStudents />
      <Leaves />
    </div>
  )
}

export default Admin
