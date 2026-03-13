import React from 'react';

export function AlertBadge({ status, expirationDate }: { status: string; expirationDate?: string }) {
  // Optionally, use expirationDate to determine badge color
  let color = 'bg-green-100 text-green-700';
  let label = status;
  if (status === 'expired') {
    color = 'bg-red-100 text-red-700';
    label = 'Expired';
  } else if (status === 'expiring-soon') {
    color = 'bg-orange-100 text-orange-700';
    label = 'Expiring Soon';
  } else if (status === 'valid') {
    color = 'bg-green-100 text-green-700';
    label = 'Valid';
  }
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>{label}</span>
  );
}
