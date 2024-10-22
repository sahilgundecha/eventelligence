import React from 'react';
import './EventCard.css'; // Assuming you're using SCSS for styling

const EventCard = ({ upcomingEventsCount, title, color }) => {
  return (
    <div className='event-card'>
      <div className='event-count'>
        {/* {upcomingEventsCount != 0
          ? String(upcomingEventsCount).padStart(2, '0')
          : up} */}
        {upcomingEventsCount}
      </div>
      <div className='event-header'>
        <span className={`status-dot`} style={{ backgroundColor: color }} />
        <span className='event-title'>{title}</span>
      </div>
    </div>
  );
};

export default EventCard;
