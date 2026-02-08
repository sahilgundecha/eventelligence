/**
 * ActionTooltip Component
 * Reusable button with hover tooltip
 */
import { useState } from "react";

const ActionTooltip = ({ icon, label, tooltip, onClick, className = "" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        title={tooltip}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`p-2 hover:bg-gray-100 rounded transition-colors ${className}`}
      >
        {icon}
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
          {label}
        </div>
      )}
    </div>
  );
};

export default ActionTooltip;
