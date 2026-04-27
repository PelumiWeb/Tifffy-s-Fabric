'use client';

import { useState } from 'react';

export default function FilterBar({ count }: { count: number }) {
  const [sort, setSort] = useState('Newest');
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Mini', 'Midi', 'Maxi', 'Sets'];

  return (
    <div className="filterbar">
      <div className="filterbar-filters">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background: 'transparent', border: 0, padding: '6px 0', color: filter === f ? 'var(--ink)' : 'var(--fg-2)', borderBottom: filter === f ? '1px solid var(--ink)' : '1px solid transparent', transition: 'all 180ms var(--ease)', cursor: 'pointer', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap' }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-2)', whiteSpace: 'nowrap' }}>{count} styles</div>
      <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => setSort(sort === 'Newest' ? 'Price' : 'Newest')}>
        Sort · <span style={{ color: 'var(--fg-2)' }}>{sort} ↓</span>
      </div>
    </div>
  );
}
