/**
 * EventStatsSection Component
 * Display event statistics
 */
import EventStatsCard from "./EventStatsCard.jsx";
import { STATUS_CONFIG, EVENT_STATUS } from "../constants.js";

const EventStatsSection = ({ stats }) => {
  const statCards = [
    {
      key: "upcoming",
      label: "Upcoming",
      count: stats.upcoming,
      color: STATUS_CONFIG[EVENT_STATUS.UPCOMING].color,
    },
    {
      key: "ongoing",
      label: "Ongoing",
      count: stats.ongoing,
      color: STATUS_CONFIG[EVENT_STATUS.ONGOING].color,
    },
    {
      key: "past",
      label: "Past",
      count: stats.past,
      color: STATUS_CONFIG[EVENT_STATUS.PAST].color,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statCards.map((stat) => (
        <EventStatsCard
          key={stat.key}
          count={stat.count}
          label={stat.label}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default EventStatsSection;
