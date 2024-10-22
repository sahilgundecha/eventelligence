import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const addEvent = async () => {
    const event = {
      eventName: 'Tech Conference 2025',
      eventCode: 'TC2024',
      category: 'Technology',
      startDate: '25/11/2025',
      startTime: '09:00 AM',
      endDate: '07/12/2025',
      endTime: '05:00 PM',
    };

    const response = await fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event), // Convert the event data to JSON
    });

    console.log({ response });

    navigate('/dashboard');
  };

  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <img src='/success.png' alt='' className='mb-4' />
      <p className='text-[#000000] text-center mb-5 text-base font-semibold'>
        Event Copied Successfully
      </p>
      <button
        className='outline outline-2 bg-[#201502] text-base font-semibold text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-[#FF5B2E]'
        onClick={addEvent}
      >
        Go to dashboard
      </button>
    </div>
  );
};

export default SuccessPage;
