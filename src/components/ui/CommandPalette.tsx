import React, { useState, useEffect, useRef } from 'react';
import { Command, CommandInput, CommandList, CommandItem } from 'shadcn-ui/command';
import { useRouter } from 'next/navigation';
import { useGlobalStore } from '@/store/useGlobalStore';

const actions = [
  { label: 'Open vehicle profile', action: (id: string) => `/vehicles/${id}` },
  { label: 'Create mission', action: () => '/missions/new' },
  { label: 'Add fuel entry', action: () => '/fuel/new' },
  { label: 'Add maintenance record', action: () => '/maintenance/new' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-4">
        <Command>
          <CommandInput
            ref={inputRef}
            value={query}
            onValueChange={setQuery}
            placeholder="Type a command or search..."
            className="mb-2"
          />
          <CommandList>
            {actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase())).map((a, i) => (
              <CommandItem
                key={i}
                onSelect={() => {
                  const url = a.action('1'); // Example: pass selected id
                  router.push(url);
                  setOpen(false);
                }}
              >
                {a.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
