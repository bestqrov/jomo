import React from 'react';

export interface TimelineEvent {
  type: string;
  date: string;
  title: string;
  description: string;
}

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative border-l border-gray-200">
      {events.map((event, i) => (
        <li key={i} className="mb-6 ml-4">
          <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-1.5 border border-white"></div>
          <time className="mb-1 text-xs font-normal leading-none text-gray-400">{event.date}</time>
          <div className="text-sm font-semibold">{event.title}</div>
          <div className="text-xs text-gray-600">{event.description}</div>
        </li>
      ))}
    </ol>
  );
}
