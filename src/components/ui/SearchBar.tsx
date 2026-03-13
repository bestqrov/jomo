import React, { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');
  return (
    <div className="flex items-center bg-white rounded shadow px-3 py-2">
      <Search className="text-gray-400 mr-2" size={18} />
      <input
        className="outline-none flex-1 text-sm bg-transparent"
        type="text"
        placeholder="Search vehicles, clients, missions, documents..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onSearch(query); }}
      />
    </div>
  );
}
