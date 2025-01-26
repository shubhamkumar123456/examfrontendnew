import React from 'react'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const ExamsubmitedSuccess = () => {
  return (
    <div>
        <Result
    status="success"
    title="Exam submitted successfully"
    subTitle="you can check your result on dashboard"
    extra={[
      <Link type="primary" to={'/dashboard/student'} className='btn btn-info' key="console">
        Dashboard
      </Link>,
     
    ]}
  />
    </div>
  )
}

export default ExamsubmitedSuccess
