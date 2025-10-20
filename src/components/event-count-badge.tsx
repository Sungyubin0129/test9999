'use client';

import React from 'react';

interface EventCountBadgeProps {
  count: number;
  className?: string;
}

export default function EventCountBadge({
  count,
  className = ''
}: EventCountBadgeProps) {
  if (count === 0) return null;

  const getCountClass = (count: number) => {
    if (count === 1) return 'count-1';
    if (count === 2) return 'count-2';
    if (count === 3) return 'count-3';
    if (count === 4) return 'count-4';
    return 'count-5-plus';
  };

  const displayCount = count > 9 ? '9+' : count.toString();

  return (
    <div className={`event-count-badge ${getCountClass(count)} ${className}`}>
      {displayCount}
    </div>
  );
}
